const rand = (min, max) => Math.round(Math.random() * (max - min) + min)
const geraMaiuscula = () => String.fromCharCode(rand(65, 90))
const geraMinuscula = () => String.fromCharCode(rand(97, 122))
const geraNumero = () => String.fromCharCode(rand(48, 57))
const simbolos = ',.;~^[]{}!@#$%*()_+=-'
const geraSimbolo = () => simbolos[rand(0, simbolos.length - 1)]

export default function geraSenha(qtd, maisuculas, minusculas, numeros, simbolos){
    const senhaArray = []
    qtd = Number(qtd)

    for(let i = 0; i < qtd; i++){
        maisuculas && senhaArray.push(geraMaiuscula())
        minusculas && senhaArray.push(geraMinuscula())
        numeros && senhaArray.push(geraNumero())
        simbolos && senhaArray.push(geraSimbolo())
    }

    return senhaArray.join('').slice(0, qtd)
}