import { Alert, Flex, Layout, Spin } from "antd"
import NewsSnippet from "./components/newSnippet/NewSnippet"
import { useGetNewsSnippetQuery } from "./services/newsApi"

const { Content } = Layout

function App() {
  const { data, error, isLoading } = useGetNewsSnippetQuery(260855433)

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Content>
        <Flex
          justify="center"
          align="center"
          style={{
            minHeight: "100vh",
            background:
              "linear-gradient(150deg, rgb(37, 34, 64) 0%, rgb(0, 0, 0) 60%)"
          }}
        >
          {isLoading && <Spin size="large" />}
          {error && <Alert type="error" message="Ошибка загрузки данных." />}
          {data && (
            <div style={{ maxWidth: "60%" }}>
              <NewsSnippet data={data} />
            </div>
          )}
        </Flex>
      </Content>
    </Layout>
  )
}

export default App
