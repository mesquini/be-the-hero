import connection from '../database/connection';
import generateUniqueId from '../utils/generateUniqueId';

export default {
  async index(req, res) {
    const { page = 1 } = req.query;

    const [count] = await connection('ongs').count();

    const ongs = await connection('ongs')
      .limit(5)
      .offset((page - 1) * 5)
      .select('*');

    res.header('X-Total-Count', count['count(*)']);

    return res.json(ongs);
  },

  async store(req, res) {
    const { name, email, whatsapp, city, uf } = req.body;

    const id = generateUniqueId();

    await connection('ongs').insert({
      id,
      name,
      email,
      whatsapp,
      city,
      uf,
    });

    return res.json({ id });
  },
  async update(req, res) {
    const ong_id = req.headers.authorization;

    if (!ong_id)
      return res.status(404).json({ error: 'Operation not permitted' });

    const ong = await connection('ongs').where({ id: ong_id });

    if (!ong) return res.status(404).json({ error: 'ONG not found' });

    await connection('ongs')
      .where({ id: ong_id })
      .update(req.body);

    return res.status(204).send();
  },
};
