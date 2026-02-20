import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

// TODO : 
// - Pouvoir ajouter un produit à un panier 
// - Sauvegarder ce panier en local storage ?
// - Pouvoir rechercher un item dans la liste 
// - Pouvoir filtrer les items selon la catégorie / le prix etc 


function Products() {
    // 1- State, données etc 
    const [products, setProducts] = useState(null)
    const navigate = useNavigate()
    
    // useEffect pour le call API
    useEffect(() => {
        fetch("https://fakestoreapi.com/products")
        .then(data => data.json())
        .then(products => {
            setProducts(products)
        })
        .catch(err => console.log(err))
    }, []) 

    // 2 - Les opérations (fonctions / méthodes)
    const handleProductClick = (productId) => {
        navigate(`/products/${productId}`)
    }

    // 3 - La vue
    return (  

        <>
            <h1 className="text-3xl font-bold p-6">Page de produits</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                {(products != null) && products.map(product => 
                    <div 
                        key={product.id}
                        onClick={() => handleProductClick(product.id)}
                        className="bg-white rounded-lg shadow-md hover:shadow-lg transition cursor-pointer overflow-hidden"
                    >
                        <div className="bg-gray-100 h-64 flex items-center justify-center p-4">
                            <img 
                                src={product.image} 
                                alt={product.title}
                                className="max-h-full max-w-full object-contain"
                            />
                        </div>
                        <div className="p-4">
                            <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                                {product.title}
                            </h3>
                            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                                {product.description}
                            </p>
                            <div className="flex justify-between items-center">
                                <p className="text-2xl font-bold text-indigo-600">
                                    ${product.price}
                                </p>
                                <p className="text-yellow-500 font-semibold">
                                    ⭐ {product.rating?.rate}
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            
        </>
    )
}

export default Products ;