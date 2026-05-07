
const data = {
    nombre: 'Perez Lautaro Ivan'
}

export function PresentationSection(){
    return(
        <div className="h-max p-50 border-8 border-accent flex flex-col justify-center items-center ">
            <p className="text-7xl font-the-nautigal text-accent">{data.nombre}</p>
            <h1 className="text-9xl font-bebas-neue">PROGRAMADOR</h1>
        </div>
    )
    
}