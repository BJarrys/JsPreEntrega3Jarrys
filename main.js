let monto=0;

function Iniciar()
{
    let opciones = [
        {
            id: 1,
            descripcion: "Prestamo a 6 meses",
            interes: 45,
            meses: 6
        },
        {
            id: 2,
            descripcion: "Prestamo a 12 meses",
            interes: 72,
            meses: 12
        },
        {
            id: 3,
            descripcion: "Prestamo a 24 meses",
            interes: 114,
            meses: 24
        }
    ];

    let listaDeOpciones="";
    opciones.forEach(element => {
        listaDeOpciones+= element.id.toString() + ". " + element.descripcion +"\n";
    });

    let opcion;
    opcion=prompt(listaDeOpciones);

    const resultado = opciones.find(({ id }) => id === parseInt(opcion));

    if (resultado!=null)
    {
        alert("Usted seleccionó la opción '" + resultado.descripcion + "'");
        SeleccionDeImporte();
        CalculoCuotaMesAMes(monto, resultado.interes, resultado.meses);
    } else {
        alert("Usted seleccionó una opción incorrecta");
    }

}

function SeleccionDeImporte()
{
    monto=parseFloat(prompt("Ingrese el monto total del crédito a solicitar", 0));
    if (isNaN(monto)==false && monto<=10000)
    {
        alert("Debe ingresar un monto mayor a $ 10.000");
        SeleccionDeImporte();
    }
}

function CalculoCuotaMesAMes(monto, interes, tiempo)
{
    let pagoInteres=0, pagoCapital = 0, cuota = 0;

    cuota = monto * (Math.pow(1+interes/100, tiempo)*interes/100)/(Math.pow(1+interes/100, tiempo)-1);
    
    let mostrar="<thead><tr><th>Mes</th><th>Cuota Total</th><th>Capital pagado</th><th>Interés pagado</th><th>Saldo</th></tr></thead><tbody>";
    for(let i = 1; i <= tiempo; i++) {

        pagoInteres = parseFloat(monto*(interes/100));
        pagoCapital = cuota - pagoInteres;
        if (i==tiempo)
        {
            monto=0;
        }
        else
        {
            monto = parseFloat(monto-pagoCapital);
        }

        mostrar+="<tr><td>" + i + "</td><td>" + cuota + "</td><td>" + pagoCapital + "</td><td>" + pagoInteres + "</td><td>" + monto + "</td></tr>";
    }

    mostrar+="</tbody>"

    document.getElementById("TPago").innerHTML=mostrar;
} 