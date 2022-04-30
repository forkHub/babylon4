export class Tombol {

    buat(label: string, f: Function): HTMLButtonElement {
        let button: HTMLButtonElement = document.createElement('button');
        button.classList.add("btn");
        button.classList.add("btn-primary");
        button.style.display = 'block';
        button.style.margin = 'auto';
        button.style.marginBottom = '8px';
        button.textContent = label;
        button.onclick = (e: MouseEvent) => {
            e.stopPropagation();
            f();
        }
        return button;
    }
}