/*
  В функцию appendToBody передаются 3 параметра:
  tag - имя тега, content - содержимое тега и count - количество вставок.
  Необходимо, чтобы функция осуществила вставку на страницу указанный тег с указанным содержимым указанное число раз.
  Считаем, что всегда передается тег, допускающий вставку текста в качестве своего содержимого (P, DIV, I и пр.).
*/
export function appendToBody(tag, content, count) {
    let k = 0;
    while (k < count) {
        let inserttag = document.createElement(tag);
        inserttag.innerHTML = content;
        document.body.appendChild(inserttag);
        k++;
    }
}

/*
  Создайте дерево вложенных тегов DIV.
  Каждый узел дерева должен содержать childrenCount узлов.
  Глубина дерева задается параметром level.
  Каждый элемент должен иметь класс вида item_n, где n - глубина вложенности элемента. (Нумерацию ведем с единицы).
  Сформированное дерево верните в качестве результата работы функции.
*/
export function generateTree(childrenCount, level) {
    function wood(value, level) {
        let k = value - 1;
        let parent;
        if (level > 0) {
            if (document.getElementsByClassName('item_' + k).length == 0) {
                parent = document.createElement('div');
                document.body.appendChild(parent);
                parent.setAttribute('class', 'item_' + value);
                wood(value + 1, level - 1);
            } else {
                for (parent of document.getElementsByClassName('item_' + k)) {
                    for (let i = 0; i < childrenCount; i++) {
                        let child = document.createElement('div');
                        child.setAttribute('class', 'item_' + value);
                        parent.appendChild(child);
                    }
                }
                wood(value + 1, level - 1);
                return parent;
            }
        }
        return parent;
    }
    return wood(1, level);
}

/*
  Используйте функцию для создания дерева тегов DIV из предыдущего задания.
  Создайте дерево с вложенностью 3 и числом элементов в каждом узле 2.
  Далее замените все узлы второго уровня (т.е. имеющие класс item_2) на теги SECTION.
  Остальную структуру дерева сохраните неизменной, включая классы и те элементы,
  которые находились внутри переписанных тегов.
  Сформированное дерево верните в качестве результата работы функции.
*/
export function replaceNodes() {
    let tree = generateTree(2, 3);
    let parent = document.getElementsByClassName('item_1')[0];
    for (let node of document.getElementsByClassName('item_2')) {
        if (node.tagName != 'SECTION') {
            let newnode = document.createElement('SECTION');
            newnode.setAttribute('class', 'item_2');
            for (let i = 0; i < 2; i++) {
                let child = node.firstChild;
                newnode.appendChild(child);
            }
            parent.appendChild(newnode);
        }
    }
    for (let i = 0; i < 2; i++) {
        let deletenode = document.getElementsByClassName('item_2')[0];
        parent.removeChild(deletenode);
    }
    return tree;
}
