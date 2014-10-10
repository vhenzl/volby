insert into People (`Name`, `Year`) 
select distinct SUBSTRING_INDEX(Name, ' ', 2) NameX, (Year - Age)
from Candidates
order by NameX;

update Candidates c set PersonId = (select Id from People p where p.Name = SUBSTRING_INDEX(c.Name, ' ', 2) and p.Year = (c.Year - c.Age));

update Candidates set PersonId = 33 where PersonId = 34;
update Candidates set PersonId = 50 where PersonId = 51;
update Candidates set PersonId = 87 where PersonId = 88;
update Candidates set PersonId = 92 where PersonId = 93;
update Candidates set PersonId = 170 where PersonId = 171;
update Candidates set PersonId = 191 where PersonId = 192;
update Candidates set PersonId = 209 where PersonId = 210;
update Candidates set PersonId = 280 where PersonId = 281;
update Candidates set PersonId = 163 where PersonId in (164, 165);
update Candidates set PersonId = 295 where PersonId = 151;

delete from People where (select count(*) from Candidates c where c.PersonId = People.Id) = 0;