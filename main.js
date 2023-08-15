let monto=0;
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

function Pasos(n)
{
    switch(n) {
        case 1:
            let opcion = document.getElementById("tipo").value;
            const resultado = opciones.find(({ id }) => id === parseInt(opcion));

                displayBlock("paso1", "none");
                displayBlock("titulo", "block");
                displayBlock("paso2", "block");
                document.getElementById("btnPaso2").disabled=true;

                document.getElementById("tipoPrestamo").innerHTML=resultado.descripcion;
                document.getElementById("intereses").innerHTML=resultado.interes + "%";
          break;
        case 2:
            displayBlock("paso2", "none");
            displayBlock("paso3", "block");
            const resultado2 = opciones.find(({ id }) => id === parseInt(document.getElementById("tipo").value));
            CalculoCuotaMesAMes(document.getElementById("monto").value, resultado2.interes, resultado2.meses);
          break;
      }
}

function Iniciar()
{
    let listaDeOpciones="";
    let countOptions = document.querySelectorAll('option').length;
    if (countOptions==0)
    {
        opciones.forEach(element => {
            var opt = document.createElement("option");
            opt.value = element.id;
            opt.text = element.descripcion;
            document.getElementById("tipo").appendChild(opt);
        });
    }
    
    displayBlock("paso1", "block");
    displayBlock("titulo", "none");
    displayBlock("paso2", "none");
    displayBlock("paso3", "none");
    document.getElementById("monto").value="";
}

function SeleccionDeImporte()
{
    monto=parseFloat(document.getElementById("monto").value);
    if (isNaN(monto)==false && monto<=10000)
    {
        mostrarError("Debe ingresar un monto mayor a $ 10.000");
    }
}

function validarMonto()
{
    monto=parseFloat(document.getElementById("monto").value);
    if (isNaN(monto)==false && monto>10000)
    {
        document.getElementById("btnPaso2").disabled=false;
    } else{
        document.getElementById("btnPaso2").disabled=true;
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

function displayBlock(id, display)
{
    var step = document.getElementById(id);
    step.style.display=display;
}

function mostrarError(error)
{
    displayBlock("error", "block");
    document.getElementById("textoError").innerHTML=error;
}