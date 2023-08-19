# Associer plusieurs remotes à un dépôt local

## Lister les remotes

On peut lister les remotes associées au repo local avec `git remote -v`

## Ajouter une remote

On peut ajouter une remote avec `git remote add` et deux arguments :

1. le nom de la remote (au choix)
2. l'adresse de la remote (la même qu'on aurait utilisée pour faire un clone)

Ajouter une remote *prof* pour le repo *git@github.com:O-clock-Ohm/oKanban-api-GaetanOclock.git* :

```git remote add prof git@github.com:O-clock-Ohm/oKanban-api-GaetanOclock.git```

## Récupérer des modification depuis une branche d'une remote spécifique :

Pour récupérer les modifications d'une branche A depuis une remote X, on utilise `git pull X A`. Par ex. récupérer la branche *jour2_models* depuis la remote *prof* :

```
git pull prof jour2_models
```

On peut ajouter des options pour faciliter le travail sur les conflits. Notamment pour écraser automatiquement le code local avec le code entrant avec `-X theirs` :

```
git pull prof -X theirs jour2_models
```

Lors du premier pull d'une remote supplémentaire, on essaie de lier deux historiques Git qui ne se connaissent pas. Il faut forcer ce premier merge avec --allow-unrelated-history :

```
git pull prof --allow-unrelated-history -X theirs jour2_models
```

## Conflits

Lorsqu'on récupère des modifications qui entrent en conflit avec le code local, il faut résoudre les conflits. 
Git ajoute automatiquement des marqueurs de conflit dans le code (un [exemple](https://user-images.githubusercontent.com/802805/44273570-6e11da00-a205-11e8-88e7-cc81c8e7d71e.png))

Le but à cette étape est d'arriver à un fichier sans ces marqueurs et dont le code nous convient. Il faut donc résoudre les conflits un par un soit en gardant le code entrant seulement, soit le code local seulement soit un mélange/refacto des deux. Peu importe le choix, pour valider la résolution de conflit, il faut faire un nouveau `git commit`.

## Quelques erreurs possibles :

```
From github.com-clock-Ohm/oKanban-api-GaetanOclock
* branch jour1_conception -> FETCH_HEAD
fatal: refusing to merge unrelated histories
```

Refusing to merge unrelated histories signifie que Git ne peut pas mélanger deux historiques qui ne se connaissent pas.
=> dans ce cas penser à l'option --allow-unrelated-histories
`git pull --allow-unrelated-histories prof jour1_conception`

___

```
From github.com:O-clock-Ohm/oKanban-api-GaetanOclock
 * branch            jour1_conception -> FETCH_HEAD
error: The following untracked working tree files would be overwritten by merge:
	docs/conception/user_stories.md
Please move or remove them before you merge.
Aborting
```

Lorsqu'on a des modifs dans le code local qui ne sont pas encore suivies dans un commit qui risquent d'être écrasées (perdues) lors du merge automatique, git refuse de faire ce merge.
=> faire un commit et recommencer

## Un pull réussi

```
git pull --allow-unrelated-histories prof jour1_conception
Depuis github.com:O-clock-Ohm/oKanban-api-GaetanOclock
 * branch            jour1_conception -> FETCH_HEAD
 * [nouvelle branche] jour1_conception -> prof/jour1_conception
Mise à jour be52fa3..4f20650
Fast-forward
 docs/conception/Cards.svg       | 78 ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 docs/conception/mcd.mocodo.txt  |  6 ++++++
 docs/conception/okanban.mld     |  4 ++++
 docs/conception/user_stories.md | 21 +++++++++++++++++++++
 user_stories.md                 |  7 -------
 5 files changed, 109 insertions(+), 7 deletions(-)
 create mode 100644 docs/conception/Cards.svg
 create mode 100644 docs/conception/mcd.mocodo.txt
 create mode 100644 docs/conception/okanban.mld
 create mode 100644 docs/conception/user_stories.md
 delete mode 100644 user_stories.md
 ```
