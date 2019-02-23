(function() {
  const myForm = document.getElementById('myForm');
  const itemList = document.getElementById('itemList');
  const btnClearList = document.getElementById('btnClearList');
  const btnUncheckAll = document.getElementById('btnUncheckAll');
  const btnCheckAll = document.getElementById('btnCheckAll');
  
  let items = [];

  // Event Handlers
  const handleOnSubmit = (e) => {
    e.preventDefault();
    const text = (e.target.querySelector('[name="item"]')).value.trim();

    if (text.length !== 0 || text.length !== '') {
      items.push({
        text,
        checked: false
      });

      e.target.reset();
      updateLocalStorage();
      renderView();
    };
  };
  
  const handleOnClear = () => {
    items = [];
    updateLocalStorage();
    renderView();
  };

  const handleOnItemClick = (e) => {
    if (!e.target.matches('input')) {
      return false;
    };
    
    const index = e.target.dataset.index;
    items[index].checked = !items[index].checked;
    
    updateLocalStorage();
  };

  const handleCheckUncheckAll = (checkAll) => () => {
    const checked = checkAll === true ? true : false;

    items = items.map((item) => ({
      text: item.text,
      checked
    }));

    renderView();
    updateLocalStorage();
  };

  const handleOnRemove = (index) => () => {
    items.splice(index, 1);
    renderView();
    updateLocalStorage();
  };

  const handleStorageChange = (e) => {
    if (e.key === 'tacoItems') {
      loadLocalStorage();
      renderView();
    };
  };

  myForm.addEventListener('submit', handleOnSubmit);
  btnClearList.addEventListener('click', handleOnClear);
  btnUncheckAll.addEventListener('click', handleCheckUncheckAll(false));
  btnCheckAll.addEventListener('click', handleCheckUncheckAll(true));
  itemList.addEventListener('click', handleOnItemClick)
  window.addEventListener('storage', handleStorageChange);


  // Functions
  const loadLocalStorage = () => {
    const tacosJSON = localStorage.getItem('tacoItems');
    try {
      items = tacosJSON ? JSON.parse(tacosJSON) : [];
    } catch {
      items = [];
    };
  };

  const updateLocalStorage = () => {
    const tacosJSON = JSON.stringify(items);

    localStorage.setItem('tacoItems', tacosJSON);
  };

  const renderView = () => {
    itemList.innerHTML = '';

    items.forEach((item, index) => {
      const li = document.createElement('li');
      
      const label = document.createElement('label');
      label.setAttribute('for', `item-${index}`);
      label.textContent = item.text;

      const checkbox = document.createElement('input');
      checkbox.id = `item-${index}`;
      checkbox.dataset.index = index;
      checkbox.setAttribute('type', 'checkbox');
      checkbox.checked = item.checked;

      const button = document.createElement('button');
      button.textContent = 'x';
      button.className = 'button button--remove';

      button.addEventListener('click', handleOnRemove(index));

      li.appendChild(checkbox);
      li.appendChild(label);
      li.appendChild(button);
      itemList.appendChild(li);
    });
  };


  loadLocalStorage();
  renderView();
}());
