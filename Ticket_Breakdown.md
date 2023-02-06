# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

### Story Title: Generate report by custom AgentId
### Story Description: Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.

### Task 1: DB Modeling & Migration
- Description: We'd like to create new table to save custom AgentId.
- Acceptance criteria: Facility table should be related on Agents table with own custom Id.
- Dev Notes:
  * We need to create new table `FacilityAgents` to store the relationship between facility and agents. This table should have 2 foreign keys(1:n) as facilitId(primary key in Facilities table) and agentId(primary key in Agent table), another necessary columns including `customAgentId` whcih save Agent's custom Id.
  * This task will also include the works to create entity, interface, services and etc(If we use db migration in project, please create the migration file based on current structure) which related on creating new table on backend.
  * Create the CRUD functions in service and endpoints in controller *(If we have already basic service/controller structure, we don't need to do this because the constructor in service/controller will work on it)*
- Time estimates/points: 6 hrs/1 point

### Task 2: Create new endpoint/function in controller/service to create customId
- Description: We'd like to add the ability for Facilties to save their own custom Ids for each Agent.
- Acceptance criteria: Facility should have custom Id for each Agent to easy access.
- Dev Notes: 
  * We need to create endpoint `/addCustomAgentId` and function `AddCustomAgentId()` in controller/service to add row to new `FacilityAgents` table which is created in Task 1.
  * Please make sure to add guards such as `authGuard` or `roleGuard` based on requirements.
  * Please make sure to put error handling using current middleware to audit log in live(dev/staging/prod) environment.
- Related Task: Task 1
- Time estimates/points: 6 hrs/1 point

### Task 3: Create new function in service to get shifts by customAgentId
- Description: We'd like to create new function `getShiftsByCustomAgentId(customAgentId)` which returns all Shifts worked that quarter, including some metadata about the Agent assigned to each
- Acceptance Criteria: This function should return all shifts for that quarter by given Custom Agent Id.
- Dev Notes:
  * We need to create function `getShiftsByCustomAgentId(customAgentId)` in service which return all shifts worked that quarter.
  * We will find actual agentId in `FacilityAgent` and get all shifts in `Shifts` table using foreign key.
  * This function will includes some necessary agent metadata based on requirement.
  * Please make sure to put error handling using current middleware to audit log in live(dev/staging/prod) environment.
  * Please check time consuming/difficulty in case there are lots of agents/shifts and optimize to pass load testing.
- Related Task: Task 1
- Time estimates/points: 6 hrs/1 point

### Task 4: Create new endpoint/function in controller/service to generate reports by custom Agent Id
- Description: We'd like to generate reports by custom Agent Id
- Acceptance Criteria: This function should generate report by given custom Agent Id
- Dev Notes:
  * We need to create endpoint `/generateReportForAgentId` and function `GenerateReportForAgentId(customAgentId)` to generate report
  * This function will call the `getShiftsByCustomAgentId()` function which created in Task 3 and generate report from returned shifts
  * Please make sure to add guards such as `authGuard` or `roleGuard` based on requirements.
  * Please make sure to put error handling using current middleware to audit log in live(dev/staging/prod) environment.
- Related Task: Task 3
- Time estimates/points: 6 hrs/1 point


