document.addEventListener("DOMContentLoaded", () => {
    const btn = document.querySelector("#btn")
    const cityName = document.querySelector("#city-name")
    const form = document.querySelector("#form")

    // swal toast
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
    });

    form.addEventListener("submit", (e) => {
        if (cityName.value.trim() === "") {
            e.preventDefault();
            Toast.fire({
                icon: 'error',
                title: 'Please provide a city name.'
            })
        }
    })
})