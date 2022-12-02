import express from 'express';

const router = express.Router();

router.use('/', () => console.log('router called'));

export default router;
