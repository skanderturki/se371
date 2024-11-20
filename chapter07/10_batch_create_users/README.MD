# How to run Script

## On the vscode terminal, open the MySQL shell:
 > mysqlsh --mysqlx -u root -p

then provide the password: xxxx

## Switch to sql mode (if you are on the JS mode)
MySQL ... JS> \sql

Now you have

MySQL .... SQL>

## run

mysql> source ./filename

## To verify created users

mysql> select user from MySQL.user

## Exit the shell

press ctrl-D