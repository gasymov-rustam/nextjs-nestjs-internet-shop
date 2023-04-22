## Nest js

```bash
# auto generate module
$ nest g mo <name of module>

# auto generate controller
$ nest g co <name of module>

# auto generate service
$ nest g service <name of module>

# migration db(sequelize)
$ npx sequelize-cli init
$ npx sequelize-cli model:generate --name <name of model, example: User> --attributes <all fields, example: firstName:string,lastName:string,email:string>
$ npx sequelize-cli db:migrate
$ npx sequelize-cli seed:generate --name <name of model, example:demo-user>

# add initialize data
$ npx sequelize-cli db:seed:all
```