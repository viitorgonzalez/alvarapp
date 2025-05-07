'use client'

import React from 'react'
import Image from 'next/image';

export default function About() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-200 px-4">
            <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-2xl border border-gray-300">
                <Image
                    src="/alvarapp-logo.jpg"
                    alt="Logo do site"
                    width={128}
                    height={128}
                    className="mx-auto mb-6 rounded-lg"
                    priority
                />
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Sobre o Site</h1>
                <p className="text-gray-700 text-center leading-relaxed">
                    Bem-vindo ao nosso site!
                </p>
                <p className="text-gray-700 text-base leading-relaxed">
                    Esta plataforma foi criada com o objetivo de oferecer uma experiência simples,
                    segura e intuitiva para que você possa acessar seus dados com facilidade.
                </p>
                <p className="text-gray-700 text-base leading-relaxed mt-4">
                    Utilizamos tecnologias modernas como <strong>Next.js</strong> e <strong>Supabase</strong> para garantir
                    desempenho, escalabilidade e autenticação segura. Nossa missão é facilitar o acesso a funcionalidades essenciais,
                    com uma interface limpa e agradável.
                </p>
                <p className="text-gray-700 text-base leading-relaxed mt-4">
                    Estamos constantemente melhorando e ouvindo o feedback dos nossos usuários. Se tiver sugestões ou encontrar
                    algum problema, não hesite em entrar em contato.
                </p>
                <p className="text-gray-600 text-sm mt-6 text-center italic">
                    Obrigado por usar nosso site!
                </p>
            </div>
        </div>
    )
}
