import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"

function ProductDetail() {
    const { productId } = useParams()
    const navigate = useNavigate()
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const [quantity, setQuantity] = useState(1)

    useEffect(() => {
        // Fetch le produit spécifique depuis l'API
        fetch(`https://fakestoreapi.com/products/${productId}`)
            .then(data => data.json())
            .then(product => {
                setProduct(product)
                setLoading(false)
            })
            .catch(err => {
                console.log(err)
                setLoading(false)
            })
    }, [productId])

    // Ajouter au panier (simulation)
    const handleAddToCart = () => {
        console.log(`✅ Ajouté ${quantity} x "${product.title}" au panier`)
        alert(`${quantity} x "${product.title}" ajoutés au panier!`)
    }

    if (loading) {
        return <div className="text-center p-10">Chargement...</div>
    }

    if (!product) {
        return (
            <div className="text-center p-10">
                <h2>Produit non trouvé</h2>
                <button
                    onClick={() => navigate("/products")}
                    className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-500"
                >
                    Retour à la liste
                </button>
            </div>
        )
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <button
                onClick={() => navigate("/products")}
                className="mb-6 px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
            >
                ← Retour à la liste
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Image du produit */}
                <div className="flex items-center justify-center bg-gray-100 rounded-lg p-8">
                    <img
                        src={product.image}
                        alt={product.title}
                        className="max-h-96 object-contain"
                    />
                </div>

                {/* Détails du produit */}
                <div>
                    <h1 className="text-3xl font-bold mb-4">{product.title}</h1>

                    <div className="mb-4">
                        <p className="text-gray-600 mb-2">
                            <strong>Catégorie:</strong> {product.category}
                        </p>
                        <p className="flex items-center gap-2">
                            <strong>Note:</strong>
                            <span className="text-yellow-500">
                                ⭐ {product.rating?.rate} / 5
                            </span>
                            <span className="text-gray-500">
                                ({product.rating?.count} avis)
                            </span>
                        </p>
                    </div>

                    {/* Prix */}
                    <div className="mb-6 p-4 bg-indigo-50 rounded-lg">
                        <p className="text-4xl font-bold text-indigo-600">
                            ${product.price}
                        </p>
                    </div>

                    {/* Description */}
                    <div className="mb-6">
                        <h3 className="font-semibold mb-2">Description:</h3>
                        <p className="text-gray-700 leading-relaxed">
                            {product.description}
                        </p>
                    </div>

                    {/* Sélecteur de quantité et bouton */}
                    <div className="flex gap-4 items-center mb-6">
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Quantité:
                            </label>
                            <input
                                type="number"
                                min="1"
                                max="10"
                                value={quantity}
                                onChange={(e) => setQuantity(parseInt(e.target.value))}
                                className="w-20 px-3 py-2 border border-gray-300 rounded focus:outline-indigo-600"
                            />
                        </div>

                        <button
                            onClick={handleAddToCart}
                            className="flex-1 mt-6 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-500 transition"
                        >
                            🛒 Ajouter au panier
                        </button>
                    </div>

                    {/* Stock info */}
                    <p className="text-green-600 font-semibold">✓ En stock</p>
                </div>
            </div>
        </div>
    )
}

export default ProductDetail
