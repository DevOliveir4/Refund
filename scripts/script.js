 const valor = document.getElementById("amount")
 const despesa = document.getElementById("expense")
 const categoria = document.getElementById("category")
 const form = document.querySelector("form")
 const despesaLista = document.querySelector("ul")

 const despesaTotal = document.querySelector("aside header p span")
 const valorTotal = document.querySelector("aside header h2")

 const IconRemoveChild = document.querySelector(".remove-icon")


 despesa.oninput = () => {
    let value = despesa.value.replace(/^\d+$/, "")
    despesa.value = value.charAt(0).toUpperCase() + value.slice(1);
 }

 valor.oninput = () => {
    let value = valor.value.replace(/\D/g, "")
    valor.value = value

    value = Number(value) / 100

    valor.value = moedaBRL(value)
}


function moedaBRL(value) {
    value = value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    })

    return value
}

form.onsubmit = (e) => {
    e.preventDefault()

    const novaDespesa = {
        id: new Date().getTime(),
        despesa: despesa.value,
        categoria_id: categoria.value,
        categoria_name: categoria.options[categoria.selectedIndex].text,
        valor: valor.value,
        criado_agora: new Date()
    }

    despesaAdd(novaDespesa)

    form.reset()
}

function despesaAdd(novaDespesa) {
    const despesaItem = document.createElement("li")
    despesaLista.appendChild(despesaItem)
    despesaItem.classList.add("expense")

    const despesaIcon = document.createElement("img")
    despesaIcon.setAttribute("src",`./img/${novaDespesa.categoria_id}.svg`)
    despesaIcon.setAttribute("alt", novaDespesa.categoria_name)
    despesaItem.appendChild(despesaIcon)

    const despesaInfo = document.createElement("div")
    despesaInfo.classList.add("expense-info")
    despesaItem.appendChild(despesaInfo)

    const despesaNome = document.createElement("strong")
    despesaNome.innerText = novaDespesa.despesa
    despesaInfo.appendChild(despesaNome)

    const despesaCategoria = document.createElement("span")
    despesaCategoria.innerText = novaDespesa.categoria_name
    despesaInfo.appendChild(despesaCategoria)

    const despesaValor = document.createElement("span") 
    despesaValor.classList.add("expense-amount")
    despesaValor.innerText = moedaBRL(novaDespesa.valor)
    despesaItem.appendChild(despesaValor)

    const despesaRemover = document.createElement("img")
    despesaRemover.classList.add("remove-icon")
    despesaRemover.setAttribute("src", "./img/remove.svg")
    despesaRemover.setAttribute("alt", "Remover despesa")
    despesaItem.appendChild(despesaRemover)

    atualizaTotais()
}

function atualizaTotais() {
    const itens = despesaLista.children
    despesaTotal.textContent = `${itens.length} ${itens.length > 1? "despesas" : "despesa"}`

    let total = 0 
    for (let i=0; i < itens.length; i++) {
        const itemAmount = itens[i].querySelector(".expense-amount")
        let value = itemAmount.textContent.replace(/[^\d,]/g, "").replace(",", ".")
        total += Number(value)
    }

    valorTotal.innerHTML = moedaBRL(total)
}

despesaLista.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-icon")) {
        const item = e.target.closest(".expense")
        item.remove()
        atualizaTotais()
    }
})




   



