# ddu-column-joplin

[Joplin](https://joplinapp.org/) column for ddu.vim

## Required

### denops.vim

https://github.com/vim-denops/denops.vim

### ddu.vim

https://github.com/Shougo/ddu.vim

### ddu-source-joplin

https://github.com/tomato3713/ddu-source-joplin

### ddu-kind-joplin

https://github.com/tomato3713/ddu-kind-joplin

## Configuration

```vim
call ddu#custom#patch_global(#{
	\   sourceOptions: #{
	\   	joplin: #{ columns: ['joplin'] },
	\   	joplin_tree: #{ columns: ['joplin'] },
	\   },
    \ })
```

