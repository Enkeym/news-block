import {
  AppstoreOutlined,
  GlobalOutlined,
  InfoCircleOutlined,
  UserOutlined
} from "@ant-design/icons"
import { Button, Card, Tag, Tooltip, Typography } from "antd"
import React from "react"
import { IData_SnippetNews } from "../../interfaces/news"
import {
  formatCompactNumber,
  formatDate,
  getFlagImage,
  renderAuthors
} from "../../utils/newsFormatters"
import styles from "./postCard.module.scss"

const { Title, Text, Link } = Typography

interface PostCardProps {
  data: IData_SnippetNews
}

const PostCard: React.FC<PostCardProps> = ({ data }) => {
  const { day, month, year } = formatDate(data.DP)

  return (
    <Card className={styles.postCard}>
      {/* === TOP PANEL === */}
      <div className={styles.topPanel}>
        <div className="left">
          <Text className={styles.data}>
            <span className={styles.day}>{day}</span> {month} {year}
          </Text>
          <Text className={styles.reach}>
            <span>{formatCompactNumber(data.REACH)}</span> Reach
          </Text>
          <Text className={styles.traffic}>Top Traffic:</Text>
          {data.TRAFFIC.map((t) => (
            <Text key={t.value}>
              {t.value} ({(t.count * 100).toFixed()}%)
            </Text>
          ))}
        </div>

        <div className="right">
          <Tooltip title="Пояснение сантимента">
            <Button
              style={{ color: "white" }}
              icon={<InfoCircleOutlined />}
              size="small"
              type="text"
            />
          </Tooltip>

          <Tooltip title="View duplicates">
            <Button
              style={{ color: "white" }}
              icon={<AppstoreOutlined />}
              size="small"
              type="text"
            />
          </Tooltip>
        </div>
      </div>

      {/* === TITLE === */}
      <div className={styles.titleSection}>
        <Link href={data.URL} target="_blank">
          <Title className={styles.clickableTitle}>{data.TI}</Title>
        </Link>
      </div>

      {/* === META === */}
      <div className={styles.metaBlock}>
        <a
          href={`https://${data.DOM}`}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.dom}
        >
          <GlobalOutlined width={10} height={10} />
          {data.DOM}
        </a>
        <Tag className={styles.country}>
          <img
            src={getFlagImage(data.CNTR_CODE)}
            alt={data.CNTR}
            width={10}
            height={10}
            style={{ marginRight: 6, verticalAlign: "middle", borderRadius: 2 }}
          />
          {data.CNTR}
        </Tag>

        {data.AU.length > 0 && (
          <div className={styles.authors}>
            <UserOutlined style={{ marginRight: 3 }} />
            <Text style={{ color: "#585f77" }}>{renderAuthors(data.AU)}</Text>
          </div>
        )}
      </div>
    </Card>
  )
}

export default PostCard
