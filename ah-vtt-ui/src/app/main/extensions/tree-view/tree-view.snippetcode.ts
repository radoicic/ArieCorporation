import { snippetCode } from '@core/components/card-snippet/card-snippet.component';

export const snippetCodeBasic: snippetCode = {
  html: `<tree-root [ngClass]="'tree-wrapper'" [nodes]="nodesBasic" [options]="optionsBasic"></tree-root>`,
  ts: `
  // basic
  nodesBasic = [
    {
      id: 1,
      name: 'root1',
      children: [
        { id: 2, name: 'child1' },
        { id: 3, name: 'child2' }
      ]
    },
    {
      id: 4,
      name: 'root2',
      children: [
        { id: 5, name: 'child2.1' },
        {
          id: 6,
          name: 'child2.2',
          children: [{ id: 7, name: 'subsub' }]
        }
      ]
    }
  ];
  optionsBasic = {};`
};
export const snippetCodeAsync: snippetCode = {
  html: `<tree-root [ngClass]="'tree-wrapper tree-checkbox'" [options]="optionsAsync" [nodes]="nodesAsync"></tree-root>`,
  ts: `
  // async
  optionsAsync: ITreeOptions = {
    getChildren: this.getAsyncChildren.bind(this),
    useCheckbox: true
  };

  nodesAsync: any[] = [];

  asyncChildren = [
    {
      name: 'child1',
      hasChildren: true
    },
    {
      name: 'child2'
    }
  ];

  constructor() {
    this.nodesAsync = [
      {
        name: 'root1',
        children: [{ name: 'child1' }]
      },
      {
        name: 'root2',
        hasChildren: true
      },
      {
        name: 'root3'
      }
    ];
  }

  // Public Methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * getAsyncChildren
   *
   */
  getAsyncChildren() {
    const newNodes = this.asyncChildren.map((c) => Object.assign({}, c));

    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(newNodes), 1000);
    });
  }`
};
export const snippetCodeFilter: snippetCode = {
  html: `<div class="input-group mb-1"><input class="form-control form-control-sm" id="tree-filter" #filter (keyup)="treeFilter.treeModel.filterNodes(filter.value)" placeholder="filter nodes" />
  <div class="input-group-append"><button class="btn btn-sm btn-primary" (click)="treeFilter.treeModel.clearFilter(); filter.value = ''" rippleEffect>Clear Filter</button></div>
</div>
<tree-root #treeFilter [ngClass]="'tree-wrapper tree-checkbox'" [focused]="true" [options]="optionsFilter" [nodes]="nodesFilter"></tree-root><label class="mt-1"
  id="tree-fuzzy-filter">Filter By Function (Fuzzy Search)</label><input class="form-control form-control-sm" id="tree-fuzzy-filter" #filter3
  (keyup)="filterFn(filter3.value, treeFilter.treeModel)" placeholder="filter nodes by fuzzy search" />`,
  ts: `
  // filter
  optionsFilter = {
    useCheckbox: true
  };

  nodesFilter = [
    {
      name: 'North America',
      children: [
        {
          name: 'United States',
          children: [
            { name: 'New York' },
            { name: 'California' },
            { name: 'Florida' }
          ]
        },
        { name: 'Canada' }
      ]
    },
    {
      name: 'South America',
      children: [{ name: 'Argentina', children: [] }, { name: 'Brazil' }]
    },
    {
      name: 'Europe',
      children: [
        { name: 'England' },
        { name: 'Germany' },
        { name: 'France' },
        { name: 'Italy' },
        { name: 'Spain' }
      ]
    }
  ];

  /**
   * filterFn
   *
   * @param value
   * @param treeModel
   */
  filterFn(value: string, treeModel: TreeModel) {
    treeModel.filterNodes((node: TreeNode) =>
      fuzzysearch(value, node.data.name)
    );
  }

  // fuzzysearch function
  function fuzzysearch(needle: string, haystack: string) {
    const haystackLC = haystack.toLowerCase();
    const needleLC = needle.toLowerCase();

    const hlen = haystack.length;
    const nlen = needleLC.length;

    if (nlen > hlen) {
      return false;
    }
    if (nlen === hlen) {
      return needleLC === haystackLC;
    }
    outer: for (let i = 0, j = 0; i < nlen; i++) {
      const nch = needleLC.charCodeAt(i);

      while (j < hlen) {
        if (haystackLC.charCodeAt(j++) === nch) {
          continue outer;
        }
      }
      return false;
    }
    return true;
  }`
};

export const snippetCodeDargDrop: snippetCode = {
  html: `<tree-root [ngClass]="'tree-wrapper'" [state]="stateDragDrop" [options]="optionsDragDrop" [focused]="true" [nodes]="nodesDragDrop"></tree-root>`,
  ts: `
  // Drag Drop
  stateDragDrop: ITreeState = {
    expandedNodeIds: {
      1: true,
      2: true
    },
    hiddenNodeIds: {},
    activeNodeIds: {}
  };

  optionsDragDrop: ITreeOptions = {
    allowDrag: (node) => node.isLeaf,
    getNodeClone: (node) => ({
      ...node.data,
      id: v4(),
      name: \`copy of \${node.data.name}\`
    })
  };
  nodesDragDrop = [
    {
      id: 1,
      name: 'root1',
      children: [{ name: 'child1' }, { name: 'child2' }]
    },
    {
      name: 'root2',
      id: 2,
      children: [
        { name: 'child2.1', children: [] },
        { name: 'child2.2', children: [{ name: 'grandchild2.2.1' }] }
      ]
    },
    { name: 'root3' },
    { name: 'root4', children: [] },
    { name: 'root5', children: null }
  ];`
};

export const snippetCodeCheckbox: snippetCode = {
  html: `<h6 class="my-1">Tri-state checkboxes</h6>
  <tree-root id="tree1" [ngClass]="'tree-wrapper tree-checkbox'" [nodes]="nodesCheckbox" [options]="optionsCheckbox"></tree-root>
  <h6 class="my-1">Disable tri-state checkboxes</h6>
  <tree-root id="tree3" [ngClass]="'tree-wrapper tree-checkbox'" [nodes]="nodesCheckbox" [options]="optionsDisabledCheckbox"></tree-root>`,
  ts: `
  // checkbox
  nodesCheckbox = [
    {
      name: 'root1'
    },
    {
      name: 'root2',
      children: [
        { name: 'child1' },
        {
          name: 'child2',
          children: [{ name: 'grandchild1' }, { name: 'grandchild2' }]
        }
      ]
    },
    {
      name: 'asyncroot',
      hasChildren: true
    }
  ];

  optionsCheckbox: ITreeOptions = {
    useCheckbox: true,
    getChildren: this.getCheckboxChildren.bind(this)
  };

  optionsDisabledCheckbox: ITreeOptions = {
    useCheckbox: true,
    getChildren: this.getCheckboxChildren.bind(this),
    useTriState: false
  };

  /**
   * getCheckboxChildren
   *
   */
  getCheckboxChildren() {
    const newNodes = [
      {
        name: 'child1'
      },
      {
        name: 'child2'
      }
    ];

    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(newNodes), 1000);
    });
  }`
};
