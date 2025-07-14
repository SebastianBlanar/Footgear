/* -----------------------------------------------------RESET-------------------------------------------------------------------------------------- */
* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}

/*-----------------------------------------------------GENERALES-------------------------------------------------------------------------------------*/
/* #region GENERALES */
body {
    font-family: sans-serif;
    background-color: #000;
    background: linear-gradient(#d4d4d4,#454545);
}

html {
    scroll-behavior: smooth;
}

h1 {font-size: 2.5em;}
h2{font-size: 2.7em;}
h3{font-size: 2em;}
p{font-size: 1.25em;}
ul{list-style: none;}

button , input,#buy_button{
    font-size: 1em;
    font-weight: bold;
    padding: 10px 30px;
    border-radius: 10px;
    border: 1px solid #fff;
    color: #000;
    background-color: #fff;
}

button:hover,#buy_button:hover{
    color: rgb(255, 255, 255);
    background-color: rgb(0, 0, 0);
}
#buy_button {
    color: #000;
}

.container{
    max-width: 700px;
    margin: auto;
}

#ctrlbtn1:hover,#ctrlbtn2:hover,#ctrlbtn3:hover,#ctrlbtn4:hover  {
    background-color: transparent;
}
/*Los elementos de acciones*/
i,.edit-tables,.delete-tables {
    color: #f15000;
    background-color: transparent;
    border: none;
    font-size: 1.5em;
    margin-top: -30px;
    height: 0;
    width: 0;
    --bs-btn-padding-x: 0.5rem;
}
/* #endregion */
/*------------------------------HEADER-----------  */
/* #region HEADER */
header{
    background-color: transparent;
    flex-wrap: wrap;
    top: 0;
    right: 0;
    width: 100vw;
    z-index: 100;
    background: linear-gradient(to bottom, black ,transparent);
}

header .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}


header nav{
    display: flex;
    flex-direction: column;
    text-align: center;
    padding-bottom: 2px;
}

header div nav a{
    padding: 5px 12px;
    text-decoration: none;
    color: white;
    font-weight: bolder;   
}

header .navigation{
    background-image:
    url(../assets/img/75496e55be60c1cbf480d6e76bd11ec4.jpg);
    filter: saturate(2);
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    
}
.logout-button {
    margin-top: 25px;
    background-color:rgb(219, 0, 0);
    color: rgb(255, 255, 255);
    font-size: 0.5em;
    font-weight: bold;
    padding: 10px 30px;
    border-radius: 10px;
    border: 1px solid black;
}
.logout-button:hover {
    color: #000000;
    background-color: #ffffff;
}
.username {
    color: #ffffff;
    margin-right: 20px;
    margin-bottom: 10px;
}

.edit-button {
    margin-right: 20px;
    background-color:rgb(0, 44, 219);
    font-size: 0.5em;
} 
/* #endregion */

/*----------------------------MAIN-----------------------*/
/* #region MAIN */

.button_container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-items: center;
    margin-top: 15px;
}

.brands .img-container {
    margin-top: 30px;
    height: 32vh;
    display: flex;
    justify-items: center;
    text-align: center;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    filter: saturate(2);
}

#nike {
    background-image:
    linear-gradient(0deg,
    rgba(0, 0, 0, 0.2), rgba(0, 0, 0,0.4 )), 
    url("../assets/img/peakpx\ \(4\).jpg");
    box-shadow: 0 0 10px 0 #000;
}
#adidas{
    background-image:
    linear-gradient(0deg,
    rgba(0, 0, 0, 0.2), rgba(0, 0, 0,0.4 )), 
    url("../assets/img/peakpx\ \(4\).jpg");
    box-shadow: 0 0 10px 0 #000;
}
#puma{
    background-image: 
        linear-gradient(0deg,
        rgba(0, 0, 0, 0.2), rgba(0, 0, 0,0.4 )),
    url("../assets/img/peakpx\ \(4\).jpg");
    box-shadow: 0 0 10px 0 #000;
}

.img-container .shoe-image {
    background-image:
    url(../assets/img/custom-nike-dunk-high-by-you-shoes-removebg.png);
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    width: 100%;
}

#adidas_img {
    background-image: url(../assets/img/adidas-forum-low-white-collegiate-green-gy5835-1-removebg.png);
}
#puma_img {
    background-size: 90%;
    background-image: url(../assets/img/puma-removebg.png);
    margin-top: 13%;
} 

.carousel__img {
    -webkit-mask-image: linear-gradient(
        black 80%,
        transparent);

    mask-image: linear-gradient(
        black 80%,
        transparent);
        
        opacity: 1;
} 

.carousel-item--no_mask img {
    mask-image: none
}
.img_div  {
    background-image:
    linear-gradient(0deg,
    rgba(0, 0, 0, 0.8), rgba(0, 0, 0.4 ));
}
h5 {
    font-size: 1em;
    font-weight: bold;
}
.active {
    background:linear-gradient(to bottom,#000000,transparent) ;
}
/* #endregion */

/* ------------------------------------------------------------------------LOGIN */
/* #region LOGIN */
.login-body {
    background: url(../assets/img/login-background.jpg);
    height: 100vh;
    display: grid;
    background-attachment: fixed;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    place-items:center;
    overflow: hidden;
    align-items: center;
}
.form_container {
    margin-top: 5px;
    background: #e9e9e9;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0.7rem;
    height: 70vh;
    max-width: 1000px;
}
#form__img-container {
    height: 100%;
}
.form__items .h1_container {
    margin-top: 0px;
}
.form__items h1 {
    color: #a4a4a4;
}
.form__img {
    width: 125%;
    height: 100%;
    object-fit: cover;
    filter: saturate(2);
    margin-right: 40px;
}
.form__btn {
    background-color: #0367a6;
    background-image: linear-gradient(90deg, #0367a6 0%,#008997 74%);
    border-radius: 20px;
    border: 1px solid #0367a6;;
    color: #e9e9e9;
    cursor: pointer;
    font-size: 0.8rem;
    font-weight: bold;
    letter-spacing: 0.1rem;
}
.login-form {
    margin: 30px 22px ;
}
.form__btn {
    margin-top: 0.5rem;
}

.back-button {
    margin-top: 3%;
    background-color: #0367a6;
    background-image: linear-gradient(90deg,  #e10e0e 0%,#da0909  74%);
}
.register--container {
    height: 80vh;
}
.register--container li,.register--container span {
    display: none;
}
.register--body {
    margin-right: 130px;
}

.cancel-button {
    margin-top: -10px;
}
/* #endregion */

/*---------------------------------FOOTER------------------------------------  */
/* #region FOOTER */
footer{
    margin-top: 30px;
    background-color: #000000;
    display: flex;
    flex-direction: column;
    justify-items: center;
    align-items: center;
}
footer p {
    font-weight: bold;
    color: white;
}
/* #endregion */

/*------------------------------------------------ FORMULARIOS Y TABLAS */
/* #region FORMULARIOS Y TABLAS */
.table {
    background-color: aliceblue;
    color: #000000;
    border-spacing: 30px; /* Espacio entre celdas */
}
thead{
    background-color: aliceblue;
    color: #000000;
}
td {
    padding: 8px; /* Añadir espacio interno en las celdas */
}

form input {
    background-color: aliceblue;
    color: #000000;
    border: none;
}

.search-text {
    margin-top: 30px;
    font-size: 1.5em;
}
.form {
    display: flex;
    justify-content: center;
    width: 100%;
}
.form input {
    margin-top: 20px;
}

form input:focus {
    outline: none;
    border: none;
}





.form-table {
    display: flex;
    justify-items: center;
    justify-content: center;
    align-items: center;
    width: 100%;
}
.form-table tbody {
    margin-top: 30px;
}
.form-table label {
    color: #000000;
}

.valid-input {
    box-shadow: 0 0 0 2px #007bff; /* Sombra azul para indicar validez */
}

.invalid-input {
    box-shadow: 0 0 0 2px #dc3545; /* Sombra roja para indicar error */
}

/* #endregion */

/*----------------------------------------------------- MEDIA QUERIES */
/* #region DISPOSITIVOS GRANDES */
@media (min-width: 775px) {
    body {
        background: linear-gradient(#d4d4d4,#777777); 
        background-position: center center;
        background-repeat: repeat;
        background-size: cover;
    } 
    header .container {
        max-width: none;
        background: #000;
    }
    header nav {
        flex-direction: row;
        justify-content: space-around;
    }
    header .navigation{
        background-image: none;
        background-color: transparent;
        background: transparent;
    }
    
    .brands .img-container {
        height: 60vh;
    }
    h5 {
        margin-bottom: -30px;
    }
    button,#buy_button {
        font-size: 2em;
    }

    footer p{
        font-size: 3em;
    }
    header div nav a{
        padding: 20px 12px;
        margin-right: 20px;
        font-size: 1.5em;
    }
    header div nav a:hover{
        background-color: rgb(0, 0, 150);
        /* color: rgb(255, 199, 0); */
    }
    header h1 {
        font-size: 4em;
    }
    .search-text {
        margin-top: 60px;
    }
    .avatar {
        margin-top: -20%;
    }
    i,.edit-tables,.delete-tables {
        padding-top: 20px;
        height: 2em;
        --bs-btn-padding-x: 1rem;
    }
    h5 {
        font-size: 1.5rem;
    }
    .products-hero {
        display: block;
    }
    @media (max-width: 1200px){
        header .container nav a {
            font-size: 1em;
            padding: 30px 12px;
        }
    }
/* #endregion */
    /* #region DISPOSITIVOS MEDIANOS */

    @media (max-width: 980px){
        /* Dispositivos tamaño intermedio */
        header .container nav a {
            font-size: 0.8em;
            padding: 30px 5px;
        }
        .edit-button {
            font-size: 0.35em;
        }
        .logout-button {
            font-size: 0.35em;
        }
        p {
            font-size: 0.8em;
        }
    }
}
    /* #endregion */

/* #region DISPOSITIVOS PEQUEÑOS */
@media (max-width: 775px) {
    /* Tablas */
    .table th, .table td {
        font-size: 10px;
        padding: 0.5rem 0.2rem;
    }
    .table {
        border-spacing: 10px ;
    }
    /* Header */
    .logout-button {
        margin-top: 0;
        font-size: 0.8em;
    }
    .username {
        margin-right: 0;
    }
    button , input{
        margin-bottom: 10px;
    }
    .edit-button {
        margin-right: 0px;
    } 
    .header_container {
        max-width: 775px;
    }
    /* Otras configuraciones específicas */
    .search-text {
        color: #000;
        font-size: 0.6em;
        font-weight: 400;
    }
    .carousel-caption {
        padding-bottom: 0;
        bottom: 0;
    }
    div a .avatar {
        margin-top: -15%;
    }
    .table--pedidos th, .table--pedidos td {
    padding: 2x 2px;
    font-size: 9px;
    }
    /* LOGIn */
    .login-body {
        background: #e9e9e9;
    }
    .form_container {
        margin-top: 80px;
    }
    .login-body .img_container {
        display: none;
    }
    .h1_delete{
        text-align: center;
        color: #dbdbdb;
        font-size: 1.5rem;
        text-wrap: balance;
    } 
}
@media (max-width: 340px) {
    h1 {
        font-size: 2em;
    }
}
@media (max-width: 245px) {
    h1 {
        font-size: 1.5em;
    }
}
/* #endregion */