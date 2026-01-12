<template>
  <div class="min-h-screen">
    <!-- Navbar spacer -->
    <div class="h-16"></div>
    
    <div class="max-w-4xl mx-auto px-4 py-8">
      <!-- Terminal Window -->
      <div class="pixel-card overflow-hidden">
        <!-- Terminal Header -->
        <div class="flex items-center gap-2 px-4 py-3 bg-card border-b-2 border-border/50">
          <div class="flex gap-2">
            <span class="w-3 h-3 rounded-full bg-red-500/80"></span>
            <span class="w-3 h-3 rounded-full bg-yellow-500/80"></span>
            <span class="w-3 h-3 rounded-full bg-green-500/80"></span>
          </div>
          <span class="ml-4 font-pixel text-xs text-muted-foreground flex-1 text-center">
            ~/geekday/error
          </span>
          <NuxtLink
            to="/"
            class="font-pixel text-xs text-primary hover:text-primary/80 transition-colors"
          >
            [HOME]
          </NuxtLink>
        </div>
        
        <!-- Terminal Content -->
        <div class="p-6 bg-[#0a0f0a]/80 backdrop-blur-sm font-mono">
          <!-- Command prompt -->
          <div class="flex items-start gap-2 mb-6">
            <span class="text-primary font-pixel text-xs whitespace-nowrap">geek@23.5N:~$</span>
            <span class="font-pixel-cn text-sm text-foreground/80">cat {{ error?.statusCode || 404 }}.log</span>
          </div>
          
          <!-- Separator -->
          <div class="border-t border-dashed border-primary/30 mb-6"></div>
          
          <!-- Error Display -->
          <div class="text-center py-12">
            <div class="mb-8">
              <span class="font-pixel text-8xl md:text-9xl text-red-400">
                {{ error?.statusCode || 404 }}
              </span>
            </div>
            
            <h1 class="font-pixel-cn text-2xl md:text-3xl text-gradient mb-4">
              {{ errorTitle }}
            </h1>
            
            <p class="font-pixel-cn text-lg text-muted-foreground mb-8 max-w-md mx-auto">
              {{ errorDescription }}
            </p>
            
            <!-- ASCII Art -->
            <pre class="font-mono text-primary/60 text-xs mb-8 leading-tight">
    ¯\_(ツ)_/¯
            </pre>
          </div>
          
          <!-- Interactive Terminal -->
          <div class="border-t border-dashed border-primary/30 pt-6">
            <!-- Command history -->
            <div v-for="(entry, index) in commandHistory" :key="index" class="mb-4">
              <div class="flex items-start gap-2">
                <span class="text-primary font-pixel text-xs whitespace-nowrap">geek@23.5N:~$</span>
                <span class="font-pixel-cn text-sm text-foreground/80">{{ entry.command }}</span>
              </div>
              <div 
                v-if="entry.output" 
                :class="['ml-[88px] font-pixel-cn text-sm mt-1', entry.isError ? 'text-red-400' : 'text-muted-foreground']"
              >
                <span v-html="entry.output"></span>
              </div>
            </div>
            
            <!-- Command input -->
            <div class="flex items-center gap-2">
              <span class="text-primary font-pixel text-xs whitespace-nowrap">geek@23.5N:~$</span>
              <input
                ref="terminalInput"
                v-model="currentCommand"
                @keydown.enter="executeCommand"
                type="text"
                class="flex-1 bg-transparent border-none outline-none font-pixel-cn text-sm text-foreground/80 caret-primary"
                placeholder="输入 cd / 回到首页..."
                autocomplete="off"
                spellcheck="false"
              />
              <span class="w-2 h-4 bg-primary animate-pulse"></span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Quick Actions -->
      <div class="flex justify-center gap-4 mt-8">
        <button
          @click="handleError"
          class="pixel-card px-6 py-3 font-pixel-cn text-sm text-primary hover:text-foreground hover:border-primary/50 transition-colors"
        >
          ← 返回首页
        </button>
        <button
          @click="goBack"
          class="pixel-card px-6 py-3 font-pixel-cn text-sm text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors"
        >
          返回上一页
        </button>
      </div>
    </div>
    
    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  error: Object
})

const router = useRouter()

const errorTitle = computed(() => {
  switch (props.error?.statusCode) {
    case 404:
      return '页面走丢了'
    case 500:
      return '服务器开小差了'
    case 403:
      return '禁止访问'
    default:
      return '出了点问题'
  }
})

const errorDescription = computed(() => {
  switch (props.error?.statusCode) {
    case 404:
      return '你访问的页面可能已被移动、删除，或者根本不存在。试试用下面的终端导航吧！'
    case 500:
      return '服务器遇到了一些问题，我们的极客团队正在紧急修复中...'
    case 403:
      return '你没有权限访问这个页面。也许你需要先成为一名极客？'
    default:
      return props.error?.message || '发生了未知错误，请稍后再试。'
  }
})

const handleError = () => clearError({ redirect: '/' })
const goBack = () => router.back()

// Interactive terminal logic
interface CommandEntry {
  command: string
  output: string
  isError: boolean
}

const terminalInput = ref<HTMLInputElement | null>(null)
const currentCommand = ref('')
const commandHistory = ref<CommandEntry[]>([])

const funnyErrors = [
  "🤖 404 页面也有终端？是的，我们就是这么极客！",
  "🎮 迷路了？输入 find 看看有哪些页面~",
  "💻 这个页面不存在，但你的热情存在！",
  "🚀 命令未找到，但北回归线永远找得到！",
]

const findPagesOutput = `<span class="text-primary">📂 可用页面列表:</span><br><br><span class="text-yellow-400">/ 首页</span><br>  └─ <span class="text-cyan-400">/about</span>          关于北归节<br>  └─ <span class="text-cyan-400">/faq</span>            常见问题<br>  └─ <span class="text-cyan-400">/prizes</span>         奖项设置<br>  └─ <span class="text-cyan-400">/sponsors</span>       合作伙伴<br><br><span class="text-yellow-400">/schedule/ 活动日程</span><br>  └─ <span class="text-cyan-400">/schedule/day1</span>  第一天 (开幕式/开发启动)<br>  └─ <span class="text-cyan-400">/schedule/day2</span>  第二天 (路演/颁奖典礼)<br><br><span class="text-yellow-400">/tracks/ 赛道介绍</span><br>  └─ <span class="text-cyan-400">/tracks/ai-agent</span>     AI Agent 大模型智能体<br>  └─ <span class="text-cyan-400">/tracks/embodied-ai</span>  具身智能 机器人开发<br><br><span class="text-yellow-400">/workshops/ 技术工作坊</span><br>  └─ <span class="text-cyan-400">/workshops/ai-agent-dev</span>  AI Agent 开发实战<br>  └─ <span class="text-cyan-400">/workshops/embodied-ai</span>   具身智能入门<br><br><span class="text-muted-foreground">使用 cd &lt;路径&gt; 导航，例如: cd /tracks/ai-agent</span>`

function executeCommand() {
  const cmd = currentCommand.value.trim()
  if (!cmd) return
  
  const parts = cmd.split(/\s+/)
  const command = parts[0].toLowerCase()
  const args = parts.slice(1).join(' ')
  
  let output = ''
  let isError = false
  
  switch (command) {
    case 'cd':
      handleCd(args)
      return
      
    case 'find':
      output = findPagesOutput
      break
      
    case 'ls':
      output = `<span class="text-cyan-400">/                        </span> 首页<br>
<span class="text-cyan-400">/about                   </span> 关于北归节<br>
<span class="text-cyan-400">/faq                     </span> 常见问题<br>
<span class="text-cyan-400">/prizes                  </span> 奖项设置<br>
<span class="text-cyan-400">/sponsors                </span> 合作伙伴<br>
<span class="text-cyan-400">/schedule/day1           </span> 第一天日程<br>
<span class="text-cyan-400">/schedule/day2           </span> 第二天日程<br>
<span class="text-cyan-400">/tracks/ai-agent         </span> AI Agent 赛道<br>
<span class="text-cyan-400">/tracks/embodied-ai      </span> 具身智能赛道<br>
<span class="text-cyan-400">/workshops/ai-agent-dev  </span> AI Agent 工作坊<br>
<span class="text-cyan-400">/workshops/embodied-ai   </span> 具身智能工作坊`
      break
      
    case 'help':
      output = `<span class="text-primary">可用命令:</span><br>
  <span class="text-cyan-400">cd &lt;path&gt;</span>  - 导航到指定路径<br>
  <span class="text-cyan-400">cd /</span>       - 回到首页<br>
  <span class="text-cyan-400">ls</span>         - 列出可用页面<br>
  <span class="text-cyan-400">find</span>       - 显示完整页面树<br>
  <span class="text-cyan-400">clear</span>      - 清空终端<br>
  <span class="text-cyan-400">help</span>       - 显示此帮助`
      break
      
    case 'clear':
      commandHistory.value = []
      currentCommand.value = ''
      return
      
    default:
      output = `<span class="text-red-400">bash: ${command}: command not found</span><br><span class="text-muted-foreground">${funnyErrors[Math.floor(Math.random() * funnyErrors.length)]}</span>`
      isError = true
  }
  
  commandHistory.value.push({ command: cmd, output, isError })
  currentCommand.value = ''
}

function handleCd(path: string) {
  // Get current URL path (error pages might have various paths)
  const currentPath = window.location.pathname
  
  if (!path || path === '~') {
    // cd with no args or ~ goes to home
    clearError({ redirect: '/' })
    return
  }
  
  if (path === '/') {
    clearError({ redirect: '/' })
    return
  }
  
  if (path === '..') {
    // Go up one level
    const segments = currentPath.split('/').filter(Boolean)
    if (segments.length <= 1) {
      clearError({ redirect: '/' })
    } else {
      segments.pop()
      clearError({ redirect: '/' + segments.join('/') })
    }
    return
  }
  
  if (path === '-') {
    // Go back (like cd -)
    router.back()
    return
  }
  
  // Handle absolute path
  if (path.startsWith('/')) {
    clearError({ redirect: path })
    return
  }
  
  // Handle relative path - append to current path
  const basePath = currentPath.endsWith('/') ? currentPath : currentPath + '/'
  let newPath = basePath + path
  
  // Normalize the path (handle ..)
  const segments = newPath.split('/').filter(Boolean)
  const normalized: string[] = []
  for (const seg of segments) {
    if (seg === '..') {
      normalized.pop()
    } else if (seg !== '.') {
      normalized.push(seg)
    }
  }
  
  clearError({ redirect: '/' + normalized.join('/') })
}

onMounted(() => {
  commandHistory.value.push({
    command: 'find',
    output: `<span class="text-red-400">⚠️ 页面未找到</span><br><br>${findPagesOutput}`,
    isError: false
  })
  
  // Focus input
  nextTick(() => {
    terminalInput.value?.focus()
  })
})
</script>

<style>
input::placeholder {
  @apply text-muted-foreground/50;
}
</style>
