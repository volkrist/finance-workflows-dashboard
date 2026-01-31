# Finance Workflows Dashboard

Фронтенд-дашборд для просмотра workflow и отметки шагов как выполненных.  
React + Vite + TypeScript, без бэкенда — данные в локальном состоянии.

## Стек

- React 18
- Vite
- TypeScript

## Структура

```
finance-workflows-dashboard/
  src/
    data/workflows.ts      # типы и начальные 4 workflow
    components/
      WorkflowList.tsx     # список workflow слева
      WorkflowDetail.tsx   # детали + кнопки Mark complete
    App.tsx
    main.tsx
  index.html
  package.json
  vite.config.ts
  README.md
```

## Установка и запуск

```bash
cd finance-workflows-dashboard
npm install
npm run dev
```

Открой в браузере адрес из вывода (обычно http://localhost:5173).

## Возможности

- Список из 4 workflow (Invoice approval, Expense reimbursement, KYC onboarding, Chargeback handling)
- Выбор workflow → отображение шагов
- Кнопка «Mark complete» для каждого шага (локальное состояние)
