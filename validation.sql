/* Kontola správnosti zadání součtových sloupců (celkem hlasů, mandáty). Je-li vše v pořádku, nevrátí žádné řádky */

-- sedí počet hlasů u kandidátů s celkovým počtem hlasů daných ve volbách
select Year, sum(Votes) total from Candidates c
group by Year
having  total != (select TotalVotes from Elections where Year = c.Year);

-- sedí počet kandidátů s mandátem s počtem volených zastupitelů (!!! nemusí být univerzálení)
select Year, count(*) mandates from Candidates c
where Mandate = 1
group by Year
having  mandates != (select Members from Elections where Year = c.Year);

-- sedí počet hlasů u kandidátů s celkovým počtem hlasů daných straně
select Year, CandidateListNumber, sum(Votes) total from Candidates c
group by Year, CandidateListNumber
having  total != (select TotalVotes from CandidateLists where Year = c.Year and Number = c.CandidateListNumber);

-- sedí počet kandidátů s mandátem s počtem mandátů strany
select Year, CandidateListNumber, count(*) mandates from Candidates c
where Mandate = 1
group by Year, CandidateListNumber
having  mandates != (select Mandates from CandidateLists where Year = c.Year and Number = c.CandidateListNumber);

-- kontrola CandidateLists vůči Elections vyplývá z předchozích