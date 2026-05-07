'use client'

import { useRouter } from "next/navigation";
import { useState } from "react";
import { loginApi } from "../api/loginApi";


export function LoginForm(){
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    return (
        <>
            <form onSubmit={async (e) => {
                    e.preventDefault()
                    setError(null)
                    setLoading(true)
                    try{
                        await loginApi({email,password})
                        router.push('/admin/dashboard')
                    } catch{
                        setError('Email o contraseña incorrectos')
                    } finally{
                        setLoading(false)
                    }
                }} 
                className="flex flex-col gap-4 w-full max-w-sm">
                <div className="flex flex-col gap-1">
                    <label htmlFor='email' className="text-sm text-muted-foreground font-mono"> 
                        email
                    </label>
                    <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required 
                    className="bg-surface border border-border rounded px-3 py-2 text-sm font-mono text-foreground focus:outline-none focus:border-accent">
                    </input>
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor='password' className="text-sm text-muted-foreground font-mono"> 
                        password
                    </label>
                    <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required 
                    className="bg-surface border border-border rounded px-3 py-2 text-sm font-mono text-foreground focus:outline-none focus:border-accent">
                    </input>
                </div>

                {error && (
                    <p className="text-sm font-mono text-red-400">{error}</p>
                )}

                <button type="submit" disabled={loading} className="bg-accent text-black font-mono font-semibold py-2 rounded hover:opacity-90 
                disabled:opacity-50 transition-opacity">{loading ? 'conectando...': '$ login' }</button>

            </form>
        </>
    )
}