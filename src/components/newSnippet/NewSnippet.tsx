import {
  AppstoreOutlined,
  CaretDownOutlined,
  DownOutlined,
  GlobalOutlined,
  InfoCircleOutlined,
  ReadOutlined,
  UserOutlined
} from "@ant-design/icons"
import { Button, Card, Tag, Tooltip, Typography } from "antd"
import React, { useState } from "react"
import { IData_SnippetNews } from "../../interfaces/news"
import styles from "./NewsSnippet.module.scss"

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

const getFlagImage = (countryCode: string, size: number = 20) => {
  const code = countryCode.toLowerCase()
  return `https://flagcdn.com/w${size}/${code}.png`
}

interface NewsSnippetProps {
  data: IData_SnippetNews
}

const NewsSnippet: React.FC<NewsSnippetProps> = ({ data }) => {
  const [expanded, setExpanded] = useState(false)
  const [showAllTags, setShowAllTags] = useState(false)
  const [showAllHighlights, setShowAllHighlights] = useState(false)

  const { day, month, year } = formatDate(data.DP)

  const abLength = data.AB.length
  const abStart = Math.floor(abLength * 0.25)
  const abEnd = Math.floor(abLength * 0.75)
  const abPreview = data.AB.slice(abStart, abEnd)

  const maxTagsToShow = 5
  const totalTags = data.KW.length
  const visibleTags = showAllTags ? data.KW : data.KW.slice(0, maxTagsToShow)
  const hiddenCount = totalTags - maxTagsToShow

  return (
    <Card className={styles.newsCard}>
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
          <Tag color={getSentimentColor(data.SENT)}>{data.SENT}</Tag>
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

      {/* === SNIPPET TEXT === */}
      <div className={styles.snippetContent}>
        <Text style={{ color: "#fff" }}>
          {expanded ? data.AB : `...${abPreview}...`}
        </Text>
        {!expanded && (
          <Button
            style={{ alignSelf: "flex-start", paddingLeft: 0 }}
            type="link"
            size="small"
            onClick={() => setExpanded(true)}
          >
            Show more
            <CaretDownOutlined />
          </Button>
        )}
      </div>

      {/* === TAGS === */}
      <div className={styles.tags}>
        {visibleTags.map((tag) => (
          <Tag className={styles.tag} key={tag.value}>
            {tag.value}{" "}
            {tag.count > 1 && <span className={styles.count}>{tag.count}</span>}
          </Tag>
        ))}

        {!showAllTags && hiddenCount > 0 && (
          <Button
            type="link"
            size="small"
            onClick={() => setShowAllTags(true)}
            className={styles.showMoreTagsBtn}
          >
            Show All +{hiddenCount}
          </Button>
        )}
      </div>

      {/* === Original Source === */}
      <Link href={data.URL} target="_blank" className={styles.sourceLink}>
        Original Source
      </Link>

      <div className={styles.duplicatesBar}>
        <Text>
          Duplicates: <Text strong>{data.HIGHLIGHTS.length}</Text>
        </Text>

        <Button className={styles.relevance}>
          By Relevance
          <DownOutlined />
        </Button>
      </div>

      {/* === HIGHLIGHTS === */}
      <div className={styles.highlights}>
        {/* Место для компонента */}

        {!showAllHighlights && data.HIGHLIGHTS.length > 1 && (
          <Button
            type="default"
            size="small"
            onClick={() => setShowAllHighlights(true)}
            className={styles.showAllHighlightsBtn}
          >
            <DownOutlined />
            View Duplicates
          </Button>
        )}
      </div>
    </Card>
  )
}

export default NewsSnippet
