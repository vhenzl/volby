insert into Parties (`Name`) 
select distinct Name
from CandidateLists
order by Name;

update CandidateLists cc 
join Parties p on  p.Name = cc.Name
set PartyId = p.Id;

update CandidateLists cc set PartyId = 5 where PartyId = 4;


delete from Parties where (select count(*) from CandidateLists c where c.PartyId = Parties.Id) = 0;