import { CaretDownOutlined, DownOutlined } from "@ant-design/icons"
import { Button, Card, Tag, Typography } from "antd"
import React, { useState } from "react"
import { IData_SnippetNews } from "../../interfaces/news"
import CardTitle from "../сardTitle/CardTitle"
import styles from "./NewsSnippet.module.scss"
import { data } from "../../data"

const { Text, Link } = Typography

interface NewsSnippetProps {
  data: IData_SnippetNews
}

const NewsSnippet: React.FC<NewsSnippetProps> = ({ data }) => {
  const [expanded, setExpanded] = useState(false)
  const [showAllTags, setShowAllTags] = useState(false)
  const [showAllHighlights, setShowAllHighlights] = useState(false)

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
      <CardTitle data={data} />

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
