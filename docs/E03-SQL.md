# E03 SQL

Lorsqu'on essaie de supprimer un enregistrement qui a été référencé par une clé étrangère dans une autre table, il faut penser à définir une politique "ON DELETE"

Sinon, on obtient une erreur de ce type : 
```
okanban=> DELETE FROM "list" WHERE id=1;
ERREUR:  UPDATE ou DELETE sur la table « list » viole la contrainte de clé étrangère « fk_card_list » de la table « card »
DÉTAIL : La clé (id)=(1) est toujours référencée à partir de la table « card ».
```