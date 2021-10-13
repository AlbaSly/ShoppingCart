const cart = document.querySelector('#carrito');
const cartContainer = document.querySelector('#lista-carrito tbody');
const clearCartBtn = document.querySelector('#vaciar-carrito');
const coursesList = document.querySelector('#lista-cursos');

let cartList = [];

loadEventListeners();

function loadEventListeners() {
    coursesList.addEventListener('click', selectCourse);
    cart.addEventListener('click', deleteCourseFromCart);
    clearCartBtn.addEventListener('click', clearCart);
}

function selectCourse(event) {
    event.preventDefault();
    if (event.target.classList.contains('agregar-carrito')) {
        const grandparentElement = event.target.parentElement.parentElement; 
        getCourseInfo(grandparentElement);
    }
}

function getCourseInfo(element) {
    const Course = {
        img: element.querySelector('.imagen-curso').src,
        title: element.querySelector('h4').textContent,
        prize: element.querySelector('.precio span').textContent,
        amount: 1,
        id: element.querySelector('a').getAttribute('data-id')
    }

    addCourseToCart(Course);
}

function addCourseToCart(course) {
    const courseInCartIndex = cartList.findIndex(courseInCart => courseInCart.id === course.id);

    if (courseInCartIndex >= 0) {
        cartList[courseInCartIndex].amount++;
    } else {
        cartList = [...cartList, course];
    }

    updateCartView();
}

function updateCartView() {
    clearCartView();

    cartList.forEach( course => {
        const curseRow = document.createElement('tr');
        const {img, title, prize, amount, id} = course;
        curseRow.innerHTML = `
            <td> 
                <img src="${img}" width="100">
            </td>
            <td>
                ${title}
            </td>
            <td>
                ${prize}
            </td>
            <td>
                ${amount}
            </td>
            <td>
                <a href="#" class="borrar-curso" data-id="${id}">x</a>
            </td>
        `;
        cartContainer.appendChild(curseRow);
    })
}

function clearCartView() {
    cartContainer.innerHTML = null;
}

function deleteCourseFromCart(event) {
    if (event.target.classList.contains('borrar-curso')) {
        const courseIdSelected = event.target.getAttribute('data-id');
        cartList = cartList.filter(courseInCart => courseInCart.id !== courseIdSelected);

        updateCartView();
    }
}

function clearCart() {
    cartList = [];
    updateCartView();
}