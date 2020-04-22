import connection from '../database/connection';

export default {
  async index(req, res) {
    const ong_id = req.headers.authorization;

    const incidents = await connection('incidents')
      .select('*')
      .where('ong_id', ong_id);

    return res.json(incidents);
  },
};
