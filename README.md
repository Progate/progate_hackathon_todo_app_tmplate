# セットアップ

[Express で TODO アプリを実装しよう
](https://app.path.progate.com/tasks/sdUxkHx2aKtJlSTtku7ng/preview)の完成形です。

ハッカソンのテンプレで使ってください。

チーム開発する場合は代表者がダウンロードして、GitHub でリポジトリを作成し、チームメンバーに共有してください。

## 前提条件

- [Node.js 22.12.0 以降](https://app.path.progate.com/tasks/PuSZdMDZJY_cksKGNxs4b/preview)
- [Puppeteer](https://app.path.progate.com/tasks/CwBFxQbIm54hr-bxtmMn9/preview)
- [MySQL 8.0.0 以降](https://app.path.progate.com/tasks/gzSjAq0XtJzzWSFWqBnNQ/preview)
- Git

## 3. データベースに接続できるようにします

### 1. `.env.sample` のファイル名を `.env` に変更する

`.env` ファイルを使って環境変数を設定します。

以下のコマンドを実行して `.env.sample` のファイル名を `.env` に変更しましょう。

```terminal
mv .env.sample .env
```

### 2. `.env` ファイルの `DATABASE_URL` に MySQL に作成したユーザー名とパスワードを入力する

VS Code で `.env` ファイルを開きます。

```terminal
code .env
```

中身は以下のようになっています。

```text
DATABASE_URL="mysql://xxxxxx:xxxxxx@localhost:3306/todo_app_dev"
...
```

ファイル内の `DATABASE_URL` を実際のユーザー名とパスワードを使って書き換えます。

```text
# フォーマット
DATABASE_URL="mysql://{ユーザー名}:{パスワード}@localhost:3306/todo_app_dev"
# 例
DATABASE_URL="mysql://ninjawanko:password@localhost:3306/todo_app_dev"
```

※ Codespaces を利用している場合は以下のように設定してください。

```text
DATABASE_URL="mysql://path_user:password@127.0.0.1:3306/todo_app_dev"
```

### 3. `.env.test.sample` のファイル名を `.env.test` に変更する

以下のコマンドを実行して `.env.test.sample` のファイル名を `.env.test` に変更しましょう。

```terminal
mv .env.test.sample .env.test
```

### 4. `.env.test` ファイルの `DATABASE_URL` に MySQL に作成したユーザー名とパスワードを入力する

VS Code で `.env.test` ファイルを開きます。

```terminal
code .env.test
```

先ほどと同様に `DATABASE_URL` を実際のユーザー名とパスワードに置き換えます。

```text
# フォーマット
DATABASE_URL="mysql://{ユーザー名}:{パスワード}@localhost:3306/todo_app_test"
# 例
DATABASE_URL="mysql://ninjawanko:password@localhost:3306/todo_app_test"
```

※ Codespaces を利用している場合は以下のように設定してください。

```text
DATABASE_URL="mysql://path_user:password@127.0.0.1:3306/todo_app_test"
```

## 4. サーバーを起動し、ブラウザからアクセスします

データベースの設定ができたら、以下を実行してサーバーを起動してみましょう。

### 1. パッケージのインストール

必要なパッケージをインストールします。

```terminal
npm clean-install
```

### 2. データベースのマイグレーション

ローカルのデータベースにプロジェクトのデータベース情報を反映します。

```terminal
npm run db:migrate
```

実行後 MySQL にログインするとデータベースとテーブルが作成されていることが確認できます。

```terminal
$ mysql -u <ユーザー名> -p
# Codespaces を利用している場合は以下 (パスワード: password )
$ mysql -u path_user -h 127.0.0.1 -p
```

```sql
mysql> show databases;
+--------------------+
| Database           |
+--------------------+
| information_schema |
| mysql              |
| performance_schema |
| sys                |
| todo_app_dev       |
+--------------------+
```

テスト用のデータベースはテスト実行時に作成されます。

確認ができたら、`exit` で MySQL からログアウトします。

```sql
mysql> exit
```

※ `npm run db:reset` コマンドでデータベースを初期状態にリセットできます。リセットしたいタイミングで随時実行してください。

### 3. サーバーの起動

サーバーを起動しましょう。

```terminal
npm run start
```

以下の URL にアクセスすると Web ページが確認できます。

- `http://localhost:8000/`

起動したサーバーは `Ctrl + c` で停止できます。

※ Codespaces を利用している場合は自動で転送されるため、`ポート` タブから 8000 番ポートの `転送されたアドレス` にアクセスしてください。
