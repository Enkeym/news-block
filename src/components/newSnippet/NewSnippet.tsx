import { CaretDownOutlined, DownOutlined } from "@ant-design/icons"
import { Button, Card, Tag, Typography } from "antd"
import React, { useState } from "react"
import { IData_SnippetNews } from "../../interfaces/news"
import {
  parseHighlightParts,
  truncateHighlightParts
} from "../../utils/newsFormatters"
import CardTitle from "../сardTitle/CardTitle"
import styles from "./newsSnippet.module.scss"

const { Text, Link } = Typography

interface NewsSnippetProps {
  data: IData_SnippetNews
}

const NewsSnippet: React.FC<NewsSnippetProps> = ({ data }) => {
  const [expanded, setExpanded] = useState(false)
  const [showAllTags, setShowAllTags] = useState(false)

  const highlightText = data.HIGHLIGHTS.join(" ")
  const parsedParts = parseHighlightParts(highlightText)
  const collapsedParts = truncateHighlightParts(parsedParts, 365)

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
          {(expanded ? parsedParts : collapsedParts).map((p, i) =>
            p.isKeyword ? (
              <span key={i} className={styles.keywordHighlight}>
                {p.text}
              </span>
            ) : (
              <React.Fragment key={i}>{p.text}</React.Fragment>
            )
          )}
          {!expanded && "..."}
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
          Duplicates: <Text strong>1</Text>
        </Text>

        <Button className={styles.relevance}>
          By Relevance
          <DownOutlined />
        </Button>
      </div>

      {/* === Duplicates === */}
      <div className={styles.duplicates}>
        <CardTitle
          data={data}
          showSentimentTag={false}
          style={{
            border: "2px solid #0a467c",
            borderRadius: "8px",
            padding: "15px",
            margin: "15px 0"
          }}
        />

        <Button type="default" size="small" className={styles.viewButton}>
          <DownOutlined />
          View Duplicates
        </Button>
      </div>
    </Card>
  )
}

export default NewsSnippet
