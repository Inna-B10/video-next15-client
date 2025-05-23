# Project name: ViewVerse

<!--VideoVibe (ViewVibe), VideoVerse (ViewVerse), StreamSpark, Tubex, Vidberry  -->

The video platform (kind of like YouTube).

Uses Next.js v15, React+React-dom v19, tailwind, sass, typescript.

This is a [Next.js](https://nextjs.org) project bootstrapped with
[`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

### Start

First, install and run the development server:

```bash
powershell -c "irm bun.sh/install.ps1|iex"
bun dev
```

### Dependencies

```
bun add sass
bun add -D @trivago/prettier-plugin-sort-imports prettier
bun add lucide-react
bun add clsx
bun add path-to-regexp
bun add axios
bun add @tanstack/react-query
bun add dayjs
bun add tailwind-merge
bun add framer-motion
bun add react-hook-form
bun add js-cookie
bun add -D @types/js-cookie
bun add react-google-recaptcha
bun add -D @types/react-google-recaptcha
bun add react-hot-toast
bun add @reduxjs/toolkit react-redux
bun add jose
bun add html-react-parser
bun add react-hotkeys-hook
bun add rc-slider
bun add rc-tooltip
```

### ToDo

---

- [x] root layout
- [x] UI menu/nav/sidebar
- [x] metadata
- [x] UI video card
- [x] fonts (b.a VideoCard title)
- [x] Home page (ISR):
  - [x] trending videos
  - [x] explore(recommended) videos
- [x] Search
- [x] сократить название канала, если слишком длинное
- [x] Page 404
- [x] game videos
- [x] VideoCard animations
- [x] UI field, button
- [x] UI login/registration form
- [x] Integrate recaptcha
- [x] log out button
- [x] user's avatar (channel avatar || default)
- [x] email confirmation
- [x] axios interceptors
- [x] test tokens
- [x] Middleware / verify token
- [x] FIX! redirect after logout(special on pages with auth)
- [x] Profile settings
  - [x] UI form
  - [x] functions: update text fields, upload avatar/header
- [x] channel page:
  - [x] subscribe button
  - [x] banner
  - [x] section my subscriptions
- [x] [FIXME] SUBSCRIPTIONS/STUDIO linkS do not see/remember isShowedSidebar
- [x] videoPage:
  - [x] similar videos block
  - [x] collapse description of video
  - [x] styling
  - [x] comments:
    - [x] display comments
    - [x] form to add comment
    - [x] actions: edit/delete !only own comments
  - [x] player:
    - [x] current time
    - [x] make progress bar clickable
    - [x] video may not have quality options
    - [x] volume button
    - [x] implement theater mode
    - [x] style @media: when side bar is open/collapsed in theater mode
    - [x] [FIXME] not valid video duration on first loading
    - [x] [FIXME] btn pause does not changes to play at the end of video
- [x] sort/group videos on SubscriptionsPage
- [x] btn delete video from liked list
- [x] btn delete video from history list
- [x] FIXME logout on ChannelPage, History, Liked videos, Subscriptions, Playlists (should redirect
      to home/auth)
- [x] playlists:
  - [x] btn add to playList
  - [x] modal form, messages
  - [x] playlist page
  - [x] delete/toggle video from list
  - [x] rename playlist
  - [x] delete playlist
- [x] Subscribe btn should be disabled if channel owner
- [x] views updating (on refresh/play?)
- [x] history updating (on play?)
- [x] disable like and views updating for video owner
- [x] message if video not found
- [x] page with a list of user's videos
- [x] pagination
- [x] delete video functional

---

- [ ] доработать загрузку плеера на VideoPlayer
- [ ] обработать описание видео (теги и перенос строк)
- [ ] после редактирования профиля, нужно сообщение об успехе
- [ ] имя файла банера/аватара на сервере должно совпадать с пользователем/каналом
- [ ] имя файла привью на сервере должно совпадать с именем файла видео
- [ ] ? если видео неподходящего разрешения, оно загружается на сервер и фейково "обрабатывается".
      Нужно сообщение пользователю
- [ ] ? после обработки, удалить файл видео из общей папки загрузки
- [ ] ? после удаления видео из БД, файлы остаются на сервере (видео во всех папках + привью)
- [ ] ? картинки (аватар,банер,превью), которые не используются/заменяются остаются на сервере!!!
- [ ] ? crop images (thumbnail)
- [ ] ? вспомогательный текст загрузки картинок и видео (формат,размер,вес). Аватар, баннер,
      привью + видео
- [ ] ? skeleton for player
- [ ] found videos with user's comment
- [ ] TODO default banner
- [ ] button colors
- [ ] password reset option
- [ ] @media:
  - [ ] video player styles
  - [ ] images
  - [ ] grid
- [ ] ? replace Skeleton on Dynamic pages to <Loading /> or review style code (cols)
- [ ] UI block's heading/loader
  - [x] heading
  - [ ] SkeletonLoader:
    - [x] static count
    - [ ] count depends on @media
- [ ] media query:sideBar на мобилах изначально скрыт, при открытии - поверх контента
<!-- - [ ] меню кнопка?, 1 колонка
- [ ] xs 540 - меню скрыто, 2 колонки
- [ ] sm 640
- [ ] md 768 - меню скрыто, 3 колонки
- [ ] lg 1024 - меню открыто, 3 колонки
- [ ] xl 1280 - меню открыто, 4 колонки
- [ ] 2xl 1536 -->
- [?] change rc-slider and rc-tooltip to native input? (lesson 40)
- [?] component SidebarSubscriptions is needed?
- [?] getTrendingVideos (2раза, на главной + трендинг). Так это серверный компонент?

<!--
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details. -->
