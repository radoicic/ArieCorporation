import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { ITreeOptions, TreeModel, TreeNode, ITreeState } from '@circlon/angular-tree-component';
import { v4 } from 'uuid';

import * as snippet from 'app/main/extensions/tree-view/tree-view.snippetcode';

@Component({
  selector: 'app-tree-view',
  templateUrl: './tree-view.component.html',
  styleUrls: ['./tree-view.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TreeViewComponent implements OnInit {
  // public
  public contentHeader: object;

  // basic
  public nodesBasic = [
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
  public optionsBasic = {};

  // async
  public optionsAsync: ITreeOptions = {
    getChildren: this.getAsyncChildren.bind(this),
    useCheckbox: true
  };

  public nodesAsync: any[] = [];

  public asyncChildren = [
    {
      name: 'child1',
      hasChildren: true
    },
    {
      name: 'child2'
    }
  ];

  // filter
  public optionsFilter = {
    useCheckbox: true
  };

  public nodesFilter = [
    {
      name: 'North America',
      children: [
        {
          name: 'United States',
          children: [{ name: 'New York' }, { name: 'California' }, { name: 'Florida' }]
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
      children: [{ name: 'England' }, { name: 'Germany' }, { name: 'France' }, { name: 'Italy' }, { name: 'Spain' }]
    }
  ];

  // Drag Drop
  public stateDragDrop: ITreeState = {
    expandedNodeIds: {
      1: true,
      2: true
    },
    hiddenNodeIds: {},
    activeNodeIds: {}
  };

  public optionsDragDrop: ITreeOptions = {
    allowDrag: node => node.isLeaf,
    getNodeClone: node => ({
      ...node.data,
      id: v4(),
      name: `copy of ${node.data.name}`
    })
  };
  public nodesDragDrop = [
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
  ];

  // checkbox
  public nodesCheckbox = [
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

  public optionsCheckbox: ITreeOptions = {
    useCheckbox: true,
    getChildren: this.getCheckboxChildren.bind(this)
  };

  public optionsDisabledCheckbox: ITreeOptions = {
    useCheckbox: true,
    getChildren: this.getCheckboxChildren.bind(this),
    useTriState: false
  };

  // snippet code variables
  public _snippetCodeBasic = snippet.snippetCodeBasic;
  public _snippetCodeAsync = snippet.snippetCodeAsync;
  public _snippetCodeFilter = snippet.snippetCodeFilter;
  public _snippetCodeDargDrop = snippet.snippetCodeDargDrop;
  public _snippetCodeCheckbox = snippet.snippetCodeCheckbox;

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
    const newNodes = this.asyncChildren.map(c => Object.assign({}, c));

    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(newNodes), 1000);
    });
  }

  /**
   * filterFn
   *
   * @param value
   * @param treeModel
   */
  filterFn(value: string, treeModel: TreeModel) {
    treeModel.filterNodes((node: TreeNode) => fuzzysearch(value, node.data.name));
  }

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
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    // content header
    this.contentHeader = {
      headerTitle: 'Tree View',
      actionButton: true,
      breadcrumb: {
        type: '',
        links: [
          {
            name: 'Home',
            isLink: true,
            link: '/'
          },
          {
            name: 'Extensions',
            isLink: true,
            link: '/'
          },
          {
            name: 'Tree View',
            isLink: false
          }
        ]
      }
    };
  }
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
}
