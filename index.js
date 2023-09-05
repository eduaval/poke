const templateCard = document.getElementById('templateCard').content

const bprev = document.querySelectorAll('.page-item')[0]
const bnext = document.querySelectorAll('.page-item')[1]

const paginacion = {}
const pokemon = []

root.innerHTML = `
<div class="spinner-border m-5" role="status">
  <span class="sr-only">Loading...</span>
</div>`

document.addEventListener('DOMContentLoaded', () => {
    load('https://pokeapi.co/api/v2/pokemon/')
})

bnext.addEventListener('click',() => {
    root.innerHTML = `
    <div class="spinner-border m-5" role="status">
        <span class="sr-only">Loading...</span>
    </div>`
    load(paginacion[1])
    
})
bprev.addEventListener('click',() => {
    
    if(paginacion[0]==null){
        return
    }else{
        root.innerHTML = `
        <div class="spinner-border m-5" role="status">
            <span class="sr-only">Loading...</span>
        </div>`
        load(paginacion[0])
    }


})


const load = async (url) => {
    try {
        const res = await fetch(url)
        const data = await res.json()
        //console.log(data)
        const {next,previous} = data
        paginacion[1] = next
        paginacion[0] = previous
       
        root.innerHTML = ''
        data.results.forEach(element => {
            pokemon.push(element) //llenar array pokemon
        });

        pokemon.forEach(nodo => { //recorrer array pokemon
           read(nodo.url)
        })
        //console.log(pokemon)
        pokemon.splice(0, pokemon.length)//elemina contenido de pokemon

    } catch (error) {
        console.error('Error al cargar los datos:', error);
    }
}

const read = async (url) => {
    try {
        const res = await fetch(url)
        const data = await res.json()
        //console.log(data)
        
        pintarCards(data)

    } catch (error) {
        console.error('Error al cargar los datos:', error);
    }
}

const pintarCards = (data) => {

    templateCard.querySelector('img').setAttribute('src',data.sprites.other.dream_world.front_default)
    templateCard.querySelector('.h6 span').textContent = data.id
    templateCard.querySelector('h5').textContent = data.name
    
    const clone = templateCard.cloneNode(true)

    const fragment = document.createDocumentFragment()
    fragment.appendChild(clone)
    
    const root = document.getElementById('root')
    root.appendChild(fragment)

    templateCard.innerHTML = '';
}
