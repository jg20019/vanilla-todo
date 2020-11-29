import './EditableHeader.css'; 

export default function EditableHeader(el) {
    let state = {
        text: 'undefined', 
        editable: false,
    };  
    
    el.classList.add('editable-header'); 

    el.innerHTML = `
        <div></div> 
        <input type="text" value=""> 
    `; 


    let content = el.querySelector('div'); 
    let input = el.querySelector('input'); 

    content.addEventListener('dblclick', e => {
        update({editable: true}); 
    }); 

    input.addEventListener('blur', e => {
        updateHeader(); 
    });  

    input.addEventListener('keyup', e => {
        if(e.key === 'Enter') {
            updateHeader(); 
        } 
    }); 

    update(); 

    function update(next) {
        Object.assign(state, next);

        content.innerText = state.text; 
        if (state.editable) {
            input.value = state.text; 
            input.style.display = 'block'; 
        } else {
            input.style.display = 'none'; 
        } 

        input.value = state.text; 
    } 

    function updateHeader() {
        el.dispatchEvent(
            new CustomEvent('ChangeName', {
                bubbles: true, 
                detail: {name: input.value}, 
            })
        ); 


        update({editable: false}); 
    } 

    
    el.EditableHeader = { update }; 
    return el; 
} 
