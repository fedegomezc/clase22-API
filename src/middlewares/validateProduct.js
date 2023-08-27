import { z } from "zod";

const createProductSchema = z.object({
    name: z.string({
        invalid_type_error: 'Name must be a string',
        required_error: 'Name is required'
    }),
    description: z.string().min(5).max(200).default('Sin descripción'),
    dimensions: z.string(),
    weight: z.string()
});

const validationProduct = (req, res, next) => {
    try {
        req.body = createProductSchema.parse(req.body);
        next();
    } catch (error) {
        res.status(400).json({ message: 'Datos inválidos', error: JSON.parse(error.message) });
    }
};

export default validationProduct;