// components/shared/NewsMetaInfo.tsx
import { GlobalOutlined, UserOutlined } from "@ant-design/icons"
import { Tag, Typography } from "antd"
import React from "react"
import styles from "./NewsMetaInfo.module.scss"
import { IData_SnippetNews } from "../interfaces/news"
import { getFlagImage, renderAuthors } from "../utils/newsFormatters"

const { Text } = Typography

interface Props {
  data: IData_SnippetNews
}

const NewsMetaInfo: React.FC<Props> = ({ data }) => (
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

    {data.AU.length > 0 && (
      <div className={styles.authors}>
        <UserOutlined style={{ marginRight: 3 }} />
        <Text className={styles.authorsText}>{renderAuthors(data.AU)}</Text>
      </div>
    )}
  </div>
)

export default NewsMetaInfo
