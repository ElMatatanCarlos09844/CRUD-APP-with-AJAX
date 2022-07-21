const $title_list = d.getElementById('title-list');

const getAllDataPosts = () => {
    $table.querySelector('tbody').innerHTML = ""
    ajax({
        url: 'http://localhost:5550/posts',
        success: (res) => {
            //console.log(res)
            $title_list.innerHTML = `Posts List &nbsp &nbsp &nbsp &nbsp size: ${res.length}`;
            res.forEach(e => {

                $template.querySelector(".ID").textContent = e.id;
                $template.querySelector(".userID").textContent = e.userId;
                $template.querySelector(".title").textContent = e.title;
                $template.querySelector(".body").textContent = e.body;

                $template.querySelector(".edit").dataset.id = e.id;
                $template.querySelector(".edit").dataset.userId = e.userId;
                $template.querySelector(".edit").dataset.title = e.title;
                $template.querySelector(".edit").dataset.body = e.body;

                $template.querySelector(".delete").dataset.id = e.id;
                $template.querySelector(".delete").dataset.userId = e.userId;
                $template.querySelector(".delete").dataset.title = e.title;
                $template.querySelector(".delete").dataset.body = e.body;

                let $clone = d.importNode($template, true);
                $fragment.appendChild($clone);

            });
            $table.querySelector('tbody').appendChild($fragment);
        },
        error: (err) => {
            //console.error(err);
            $table.insertAdjacentHTML('afterend', `<p><b>${err}</b></p>`);
        },
        data: null
    });
};
d.addEventListener("DOMContentLoaded", getAllDataPosts);
// See the data from the API
document.getElementById('see').addEventListener("click", getAllDataPosts);

d.addEventListener("submit", (e) => {
    e.preventDefault();
    if (e.target === $form) {
        //alert(e.target.id.value)
        if (!e.target.id.value) {
            //POST
            alert("POST")
            ajax({
                url: "http://localhost:5550/posts",
                method: "POST",
                success: (res) => { location.reload },
                error: (err) => { $form.insertAdjacentHTML('afterend', `<p><b>${err}</b></p>`); },
                data: {
                    userId: e.target.userId.value,
                    title: e.target.title.value,
                    body: e.target.body.value,
                }

            })
        } else {
            //PUT
            alert("PUT")
            ajax({
                url: `http://localhost:5550/posts/${e.target.id.value}`,
                method: "PUT",
                success: (res) => { location.reload },
                error: (err) => { $form.insertAdjacentHTML('afterend', `<p><b>${err}</b></p>`); },
                data: {
                    userId: e.target.userId.value,
                    title: e.target.title.value,
                    body: e.target.body.value,
                }

            })
        }
    }
});

d.addEventListener('click', e => {
    if (e.target.matches('.edit')) {
        //alert('presionaste EDITAR')
        $title.textContent = "Edit post";
        $form.id.value = e.target.dataset.id;
        $form.userId.value = e.target.dataset.userId;
        $form.title.value = e.target.dataset.title;
        $form.body.value = e.target.dataset.body;
    }
    if (e.target.matches('.delete')) {
        let isDelete = confirm(`Estas seguro de eliminar el post ${e.target.dataset.title} con id: ${e.target.dataset.id}`)

        if (isDelete) {
            ajax({
                url: `http://localhost:5550/posts/${e.target.dataset.id}`,
                method: "DELETE",
                success: (res) => { location.reload },
                error: (err) => { $form.insertAdjacentHTML('afterend', `<p><b>${err}</b></p>`); }
            })
        } else {
            warning('Operación cancelada');
        }
    }
})

const ajax = (options) => {
    let { url, method, success, error, data } = options;

    const xhr = new XMLHttpRequest();

    xhr.addEventListener("readystatechange", (e) => {
        if (xhr.readyState !== 4) return;

        if (xhr.status >= 200 && xhr.status < 300) {
            let json = JSON.parse(xhr.responseText);
            success(json);
        } else {
            let message = xhr.statusText || "Ocurrió un error";
            error(`Error: ${xhr.status}: ${message}`);
        }
    });

    xhr.open(method || "GET", url);
    xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    xhr.send(JSON.stringify(data));
}