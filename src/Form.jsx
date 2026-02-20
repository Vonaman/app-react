import { useState, useEffect } from "react"

function Form() {
    // État pour basculer entre login et signup
    const [isLogin, setIsLogin] = useState(false)
    
    // État pour les valeurs du formulaire
    const [inputValues, setInputValues] = useState({
        email : "",
        username: "",
        password: "",
        confirm: "", 
    })

    // État pour les messages et erreurs
    const [message, setMessage] = useState("")
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    // Validation des données
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(email)
    }

    const validatePassword = (password) => {
        return password.length >= 6
    }

    const validateForm = () => {
        setError("")

        // Validation commune
        if (!validateEmail(inputValues.email)) {
            setError("Veuillez entrer un email valide")
            return false
        }

        if (!validatePassword(inputValues.password)) {
            setError("Le mot de passe doit contenir au moins 6 caractères")
            return false
        }

        // Validation spécifique au signup
        if (!isLogin) {
            if (!inputValues.username.trim()) {
                setError("Le nom d'utilisateur est requis")
                return false
            }

            if (inputValues.password !== inputValues.confirm) {
                setError("Les mots de passe ne correspondent pas")
                return false
            }
        }

        return true
    }

    // useEffect pour envoyer les données à l'API après validation
    useEffect(() => {
        // Cette fonction est appelée après chaque soumission valide
        if (message.includes("succès") || message.includes("Connecté")) {
            const sendToAPI = async () => {
                try {
                    setIsLoading(true)

                    // Préparer les données selon le type d'opération
                    const dataToSend = isLogin
                        ? {
                              email: inputValues.email,
                              password: inputValues.password,
                          }
                        : {
                              email: inputValues.email,
                              username: inputValues.username,
                              password: inputValues.password,
                          }

                    console.log(`📤 Envoi des données ${isLogin ? "LOGIN" : "SIGNUP"} à l'API:`, dataToSend)

                    // Simuler un appel API (remplacer par votre vrai API)
                    const response = await fetch("http://localhost:3000/api/auth/" + (isLogin ? "login" : "signup"), {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(dataToSend),
                    }).catch(err => {
                        console.log("⚠️ API non disponible (normal pour le développement):", err.message)
                        return null
                    })

                    if (response) {
                        const result = await response.json()
                        console.log("✅ Réponse API:", result)
                    }
                } catch (err) {
                    console.log("❌ Erreur lors de l'envoi à l'API:", err)
                } finally {
                    setIsLoading(false)
                }
            }

            sendToAPI()
        }
    }, [message])

    // Gestion de la soumission du formulaire
    const handleSubmit = (e) => {
        e.preventDefault()

        if (!validateForm()) {
            return
        }

        // Afficher un message de succès
        setMessage(`${isLogin ? "Connexion" : "Inscription"} en cours...`)
        setError("")

        // Simuler un délai d'envoi
        setTimeout(() => {
            setMessage(`✅ ${isLogin ? "Connecté" : "Inscrit"} avec succès!`)
            // Réinitialiser le formulaire
            setInputValues({ email: "", username: "", password: "", confirm: "" })
        }, 500)
    }

    // Basculer entre login et signup
    const toggleMode = () => {
        setIsLogin(!isLogin)
        setMessage("")
        setError("")
        setInputValues({ email: "", username: "", password: "", confirm: "" })
    }

    return ( 
        <>
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">

                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        alt="Your Company"
                        src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                        className="mx-auto h-10 w-auto"
                    />
                    <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                        {isLogin ? "Connectez-vous à votre compte" : "Créer un compte"}
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">

                {/* Messages d'erreur ou de succès */}
                {error && (
                    <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                        {error}
                    </div>
                )}
                {message && (
                    <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
                        {message}
                    </div>
                )}

                <form className="space-y-6" onSubmit={handleSubmit}>
                    {/* Champ Email */}
                    <div>
                        <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                            Email address
                        </label>
                        <div className="mt-2">
                            <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            autoComplete="email"
                            value={inputValues.email}
                            onChange={(e) => setInputValues({ ...inputValues, email : e.target.value })}
                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                        </div>
                    </div>

                    {/* Champ Username (seulement pour signup) */}
                    {!isLogin && (
                        <div>
                            <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900">
                                Username
                            </label>
                            <div className="mt-2">
                                <input
                                id="username"
                                name="username"
                                type="text"
                                autoComplete="username"
                                value={inputValues.username}
                                onChange={(e) => setInputValues({ ...inputValues, username : e.target.value })}
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                            </div>
                        </div>
                    )}

                    {/* Champ Password */}
                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                                Password
                            </label>
                        </div>

                        <div className="mt-2">
                            <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            autoComplete="current-password"
                            value={inputValues.password}
                            onChange={(e) => setInputValues({ ...inputValues, password : e.target.value })}
                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                        </div>
                    </div>

                    {/* Champ Confirm Password (seulement pour signup) */}
                    {!isLogin && (
                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="confirm-password" className="block text-sm/6 font-medium text-gray-900">
                                Confirm your password
                                </label>
                            </div>

                            <div className="mt-2">
                                <input
                                id="confirm-password"
                                name="confirm-password"
                                type="password"
                                value={inputValues.confirm}
                                onChange={(e) => setInputValues({ ...inputValues, confirm : e.target.value })}
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                            </div>
                        </div>
                    )}

                    {/* Bouton Submit */}
                    <div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50"
                        >
                            {isLoading ? "En cours..." : (isLogin ? "Se connecter" : "S'inscrire")}
                        </button>
                    </div>

                    {/* Basculer entre login et signup */}
                    <p className="text-center text-sm text-gray-600">
                        {isLogin ? "Pas encore de compte?" : "Vous avez déjà un compte?"}{" "}
                        <button
                            type="button"
                            onClick={toggleMode}
                            className="font-semibold text-indigo-600 hover:text-indigo-500"
                        >
                            {isLogin ? "S'inscrire" : "Se connecter"}
                        </button>
                    </p>
                </form>

                </div>
            </div>


        </> 
    );
}

export default Form 