
class ProductController {

    async addProduct(req, res) {
        
        res.json({ file: req.files });
    }

    async productList(req, res) {

    }

    async updateProduct(req, res) {

    }

    async deleteProduct(req, res) {

    }

    async productDetail(req, res) {

    }

}

module.exports = new ProductController