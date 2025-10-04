サーバーレスアプリケーション開発：AWS CI/CDパイプラインとVPC内RDS連携
概要 (Project Overview)
本プロジェクトは、AWS上に構築されたフルスタックのWeb APIバックエンドです。Serverless FrameworkとCI/CDパイプライン（CodePipeline, CodeBuild）を用いて、VPCプライベートサブネット内の**RDS (PostgreSQL)**にセキュアに接続し、データのCRUD操作を実現しています。

開発からデプロイまでのプロセスを自動化し、本番環境を見据えたインフラ設計を行いました。

達成した技術目標とアピールポイント
このプロジェクトを通じて、以下の高度なクラウドインフラの知識と技術を習得しました。

1. サーバーレス CI/CD の自動化
CodePipeline/CodeBuild: GitHubへのコードプッシュをトリガーに、ビルド、テスト、デプロイ（serverless deploy）を自動実行するCI/CDパイプラインを構築しました。

IaCの習得: インフラ（Lambda, API Gateway, RDS, DynamoDBの定義など）をすべてコード（serverless.yml）として管理し、環境の再現性とバージョン管理を実現しました。

運用自動化: デプロイ前に古い環境を削除するクリーンアップ処理（serverless remove）を組み込むことで、パイプラインの安定運用を実現しました。（※この項目は元の会話履歴から復元し、より詳細にしました。）

2. セキュアなデータベース接続（VPC統合）
VPC Private Subnet: Lambda関数とRDSデータベースを、外部からのアクセスを遮断したプライベートサブネット内に配置し、セキュアな接続環境を構築しました。

セキュリティグループ: LambdaとRDS間のアクセスを、必要なポート（PostgreSQL: 5432）のみに限定する設定（セキュリティグループ）を行い、ネットワークセキュリティを担保しました。

課題解決: Serverless FrameworkがVPCリソースを扱う際の複雑な依存関係やエラー（特にデプロイ失敗時のクリーンアップ）をデバッグし、安定したデプロイを実現しました。このデバッグ経験は、実務でのトラブルシューティング能力に直結します。（※この項目も元の会話履歴から復元し、より詳細にしました。）

3. データウェアハウス基盤の基礎
RDSの利用: 分析用途に適したリレーショナルデータベース（PostgreSQL）を選定し、アプリケーションデータの格納基盤としました。


使用技術スタック
クラウドプロバイダ

AWS: インフラ基盤

コンピューティング

AWS Lambda (Node.js 20.x): APIのビジネスロジック実行

データベース

AWS RDS (PostgreSQL): トランザクションデータの永続化

CI/CD

AWS CodePipeline, AWS CodeBuild: 継続的インテグレーション/デリバリー

インフラ管理

Serverless Framework (IaC): サーバーレスリソースの定義とデプロイ

ネットワーク

AWS VPC, Subnet, Security Group: セキュアなプライベートネットワーク構築





環境のデプロイ方法（実行方法）
（※現在はコスト効率のためリソースを削除済みですが、再構築は可能です）

必要な環境変数 (VPC_ID, SubnetIds, SecurityGroupId など) を buildspec.yml または .env に設定する。

serverless.yml のリソース設定を確認する。

serverless deploy コマンド、または CodePipelineを再実行する。