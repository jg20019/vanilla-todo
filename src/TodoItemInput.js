
export default function TodoItemInput(el) {
    el.innerHTML = `
        <input type="text"><button> + </button> 
    `; 

    let inputEl = el.querySelector('input'); 
    let saveEl = el.querySelector('button'); 
    inputEl.addEventListener('keyup', e => {
        switch(e.keyCode) {
            case 13: // enter
                save(); 
                break;
        } 
    }); 

    saveEl.addEventListener('click', () => {
        save(); 
        inputEl.focus(); 
    }); 

    function save() {
        var label = inputEl.value.trim(); 
        if (label === '') return; 

        inputEl.value = ''; 

        el.dispatchEvent(
            new CustomEvent('addItem', {
                detail: { label }, 
                bubbles: true, 
            })
        ); 
    } 
} 
