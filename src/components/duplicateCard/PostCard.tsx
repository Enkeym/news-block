import {
  AppstoreOutlined,
  GlobalOutlined,
  InfoCircleOutlined,
  UserOutlined
} from "@ant-design/icons"
import { Button, Card, Tag, Tooltip, Typography } from "antd"
import React, { useState } from "react"
import { IData_SnippetNews } from "../../interfaces/news"
import styles from "./postCard.module.scss"

const { Title, Text, Link } = Typography

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr)
  return {
    day: date.toLocaleString("en-GB", { day: "2-digit" }),
    month: date.toLocaleString("en-GB", { month: "short" }),
    year: date.toLocaleString("en-GB", { year: "numeric" })
  }
}

const formatCompactNumber = (num: number): string => {
  if (num >= 1_000_000)
    return (num / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M"
  if (num >= 1_000) return (num / 1_000).toFixed(1).replace(/\.0$/, "") + "K"
  return num.toString()
}

const renderAuthors = (authors: string[]) => {
  const shortName = (full: string) => {
    const [first, last] = full.trim().split(" ")
    return `${first}${last ? ` ${last[0]}.` : ""}`
  }

  const formatted = authors.map(shortName)

  if (formatted.length === 1) return formatted[0]
  if (formatted.length === 2) return `${formatted[0]}, ${formatted[1]}`
  return `${formatted[0]}, ${formatted[1]}, et al.`
}

const getFlagImage = (countryCode: string, size: number = 20) =>
  `https://flagcdn.com/w${size}/${countryCode.toLowerCase()}.png`

interface PostCardProps {
  data: IData_SnippetNews
}

const PostCard: React.FC<PostCardProps> = ({ data }) => {
  const [expanded, setExpanded] = useState(false)
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

      {/* === TITLE (Click to Expand) === */}
      <div className={styles.titleSection}>
        <Link
          href={data.URL}
          target="_blank"
          onClick={(e) => {
            e.preventDefault()
            setExpanded(true)
          }}
        >
          <Title className={styles.clickableTitle}>{data.TI}</Title>
        </Link>
      </div>

      {/* === SNIPPET TEXT (Visible Only After Click) === */}
      {expanded && (
        <div className={styles.snippetContent}>
          <Text>{data.AB}</Text>
        </div>
      )}

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
