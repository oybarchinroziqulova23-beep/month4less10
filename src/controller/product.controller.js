import Product from '../schema/product.schema.js';
import { ApiError } from '../utils/custom-error.js';
import { successRes } from '../utils/success-response.js';
import { errorRes } from '../utils/error-response.js';

class ProductController {
    async create(req, res) {
        try {
            const { name, price, category } = req.body;

            const existsProduct = await Product.findOne({ name });
            if (existsProduct) {
                throw new ApiError('Product name already exists', 409);
            }

            const newProduct = await Product.create(req.body);
            return successRes(res, newProduct, 201);
        } catch (error) {
            return errorRes(res, error);
        }
    }

    async findAll(_req, res) {
        try {
            const products = await Product.find().populate('category', 'name');
            return successRes(res, products);
        } catch (error) {
            return errorRes(res, error);
        }
    }

    async findOne(req, res) {
        try {
            const product = await Product.findById(req.params?.id).populate('category', 'name');
            if (!product) {
                throw new ApiError('Product not found', 404);
            }
            return successRes(res, product);
        } catch (error) {
            return errorRes(res, error);
        }
    }

    async update(req, res) {
        try {
            const product = await Product.findById(req.params?.id);
            if (!product) {
                throw new ApiError('Product not found', 404);
            }
            const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
            return successRes(res, updatedProduct);
        } catch (error) {
            return errorRes(res, error);
        }
    }

    async remove(req, res) {
        try {
            const product = await Product.findById(req.params?.id);
            if (!product) {
                throw new ApiError('Product not found', 404);
            }
            await Product.findByIdAndDelete(req.params.id);
            return successRes(res, {});
        } catch (error) {
            return errorRes(res, error);
        }
    }
}

export default new ProductController();
