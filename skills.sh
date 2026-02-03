#!/bin/bash
# Run skills with the agents from the environment variable or defaults
# Needs to run in this bash script so environment variables from dotenvx can be picked up (they don't get properly injected into npm script)
#echo $SKILLS_AGENTS
: ${SKILLS_AGENTS:="claude-code cursor github-copilot gemini-cli"}
#echo $SKILLS_AGENTS

# -y Yes to all prompts
# -a specify agents - space-delimited
npx skills add ./skills -y -a $SKILLS_AGENTS
