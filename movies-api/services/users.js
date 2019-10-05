// librería de mongo, se encarga de llamar los diferentes métodos de mongo
const MongoLib = require('../lib/mongo');
// se encarga de crear password en modo Hash
const bcrypt = require('bcrypt');

class UsersService {
  constructor() {
    this.collection = 'users';
    this.mongoDB = new MongoLib();
  }

  // recibe un email y apartir de aquí buscamos a ese usuario en la DB
  async getUser({ email }) {
    const [user] = await this.mongoDB.getAll(this.collection, { email });
    return user;
  }

  // creamos el usuario
  async createUser({ user }) {
    const { name, email, password } = user;
    // nos crea un password en modo hash
    const hashedPassword = await bcrypt.hash(password, 10);

    const createUserId = await this.mongoDB.create(this.collection, {
      name,
      email,
      password: hashedPassword
    });

    return createUserId;
  }
}

module.exports = UsersService;