import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import appwriteService from "../appwrite/config"
import { Container, Postcard, Login } from '../components'

function Home() {
    const [posts, setPosts] = useState([])
    const [showLogin, setShowLogin] = useState(false)
    
    const userData = useSelector(state => state.auth.userData) // ✅ read user from Redux

    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    }, [])

    const handleLoginClick = () => {
        setShowLogin(true)
    }

    if (posts.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            {!userData ? (
                                <>
                                    <button onClick={handleLoginClick} className="text-2xl font-bold hover:text-gray-500">
                                        Login to read posts
                                    </button>
                                    {showLogin && (
                                        <div className="w-full mt-6">
                                            <Login onClose={() => setShowLogin(false)} />
                                        </div>
                                    )}
                                </>
                            ) : (
                                <p className="text-2xl font-semibold">No posts available yet.</p>
                            )}
                        </div>
                    </div>
                </Container>
            </div>
        )
    }

    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <Postcard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home