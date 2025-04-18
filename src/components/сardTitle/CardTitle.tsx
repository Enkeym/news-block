import {
  AppstoreOutlined,
  GlobalOutlined,
  InfoCircleOutlined,
  ReadOutlined,
  UserOutlined
} from "@ant-design/icons"
import { Button, Card, Tag, Tooltip, Typography } from "antd"
import { IData_SnippetNews } from "../../interfaces/news"
import {
  formatCompactNumber,
  formatDate,
  getFlagImage,
  renderAuthors
} from "../../utils/newsFormatters"
import styles from "./cardTitle.module.scss"

const { Title, Text, Link } = Typography

interface NewsSnippetProps {
  data: IData_SnippetNews
  showSentimentTag?: boolean
}

const getSentimentColor = (sent: string) => {
  switch (sent) {
    case "positive":
      return "green"
    case "negative":
      return "red"
    case "neutral":
      return "default"
    default:
      return "blue"
  }
}

const CardTitle: React.FC<NewsSnippetProps> = ({
  data,
  showSentimentTag = true
}) => {
  const { day, month, year } = formatDate(data.DP)

  return (
    <Card className={styles.cardTitle}>
      {/* === TOP PANEL === */}
      <div className={styles.topPanel}>
        <div className="left">
          <Text className={styles.data}>
            <span className={styles.day}>{day}</span> {month} {year}
          </Text>
          <Text className={styles.reach}>
            <span>{formatCompactNumber(data.REACH)}</span> Reach
          </Text>
          <Text className={styles.topTraffic}>Top Traffic:</Text>
          {data.TRAFFIC.map((t) => (
            <Text className={styles.traffic} key={t.value}>
              {t.value} <span>{(t.count * 100).toFixed()}%</span>
            </Text>
          ))}
        </div>

        <div className="right">
          {showSentimentTag && (
            <Tag color={getSentimentColor(data.SENT)}>{data.SENT}</Tag>
          )}

          <Tooltip title="Пояснение сантимента">
            <Button
              icon={<InfoCircleOutlined />}
              size="small"
              type="text"
              style={{ color: "white" }}
            />
          </Tooltip>

          <Tooltip>
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
          <Title level={5} className={styles.title}>
            {data.TI}
          </Title>
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
          />
          {data.CNTR}
        </Tag>

        <Tag className={styles.lang}>
          <ReadOutlined />
          {data.LANG}
        </Tag>

        {data.AU.length > 0 && (
          <div className={styles.authors}>
            <UserOutlined style={{ marginRight: 3 }} />
            <Text className={styles.authorsText}>{renderAuthors(data.AU)}</Text>
          </div>
        )}
      </div>
    </Card>
  )
}

export default CardTitle
