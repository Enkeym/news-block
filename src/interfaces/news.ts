// Основной интерфейс данных о новостной карточке (сниппете)
export interface IData_SnippetNews {
  ID: number // Уникальный идентификатор новости
  TI: string // Заголовок новости (Title)
  AB: string // Краткое описание / аннотация (Abstract)
  URL: string // Ссылка на оригинальную публикацию
  DOM: string // Домен источника (например, "bbc.com")
  DP: string // Дата публикации в формате ISO (e.g. "2025-03-06T21:00:00")
  LANG: string // Язык статьи (например, "en" или "ru")
  REACH: number // Охват — количество пользователей, увидевших новость
  KW: IData_TagItem[] // Массив ключевых слов (тегов) с количеством упоминаний
  AU: string[] // Список авторов (массив строк с именами)
  CNTR: string // Название страны (например, "France")
  CNTR_CODE: string // Код страны (например, "fr")
  SENT: string // Сантимент новости: "positive", "neutral" или "negative"
  TRAFFIC: IData_TrafficItem[] // Источники трафика: страны и их доля
  FAV: string // Ссылка на иконку сайта (favicon)
  HIGHLIGHTS: string[] // Массив фрагментов статьи с <kw>тегами</kw> — ключевыми словами
}

// Интерфейс тега (ключевого слова), использованного в статье
export interface IData_TagItem {
  value: string // Само ключевое слово
  count: number // Количество раз, которое это слово встречается
}

// Интерфейс трафика — откуда пришли читатели новости
export interface IData_TrafficItem {
  value: string // Название страны источника трафика
  count: number // Доля трафика из этой страны (например, 0.36 — 36%)
}
