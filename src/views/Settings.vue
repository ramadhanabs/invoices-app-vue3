<template>
  <div class="root">
    <p class="title">Settings</p>
    <a-tabs v-model:activeKey="activeKey">
      <a-tab-pane key="1" tab="Profile" style="color: white">
        <a-row style="margin: 32px 0px">
          <a-col
            :span="8"
            style="display: flex; flex-direction: column; padding: 0px 16px"
          >
            <div class="round-wrapper" style="margin: 0px auto">
              <img
                :src="imageFile.filePath"
                alt="photo-profile"
                class="image-preview"
                v-if="imageFile.filePath"
                referrerpolicy="no-referrer"
              />
              <a-row
                align="middle"
                justify="center"
                style="height: 100%; flex-direction: column"
                v-else
              >
                <a-button shape="circle" @click="handleClickInputFile">
                  <template #icon>
                    <CameraOutlined />
                  </template>
                </a-button>
                <p style="font-size: 12px; opacity: 0.6">Add photo profile</p>
              </a-row>
            </div>
            <a-button
              @click="handleClickInputFile"
              style="margin-top: 24px"
              v-if="imageFile.filePath"
            >
              Change Image
            </a-button>
          </a-col>
          <a-col :span="16">
            <p class="subtitle">Detail profile</p>
            <text-input
              label="Name"
              placeholder="Input your Name"
              v-model="input.name"
              style="margin-bottom: 16px"
            />
            <text-input
              label="Email"
              placeholder="Input your email"
              v-model="input.email"
              type="email"
              style="margin-bottom: 16px"
            />
            <Button type="primary" shape="round" style="margin-top: 16px">
              Update
            </Button>
          </a-col>
        </a-row>
      </a-tab-pane>
      <a-tab-pane key="2" tab="Invoice">Content of Tab Pane 2</a-tab-pane>
    </a-tabs>
    <input
      type="file"
      style="visibility: hidden"
      ref="inputFile"
      accept="image/*"
      @change="handleFileChange"
    />
  </div>
</template>
<script>
import { defineComponent, ref, onMounted } from 'vue'
import TextInput from '@/components/Input/text.vue'
import Button from '@/components/Button/index.vue'
import { CameraOutlined } from '@ant-design/icons-vue'
import { useUserStore } from '@/stores/user.js'

export default defineComponent({
  components: { TextInput, Button, CameraOutlined },
  setup() {
    const userStore = useUserStore()

    const activeKey = ref('1')
    const inputFile = ref(null)
    const input = ref({
      name: '',
      email: ''
    })

    const imageFile = ref({
      filePath: null,
      fileName: '',
      imgUrl: ''
    })

    const handleClickInputFile = () => inputFile.value.click()

    const handleFileChange = (val) => {
      const [files] = val.target.files

      imageFile.value.fileName = files.name
      createBase64Image(files)
    }

    const createBase64Image = (file) => {
      const reader = new FileReader()
      imageFile.value.filePath = URL.createObjectURL(file)
      reader.onload = (e) => {
        imageFile.value.imgUrl = e.target.result
      }
      reader.readAsDataURL(file)
    }

    const resetImage = () => (imageFile.value.filePath = null)

    onMounted(() => {
      input.value.name = userStore.name
      input.value.email = userStore.email
      imageFile.value.filePath = userStore.photoUrl
    })

    return {
      activeKey,
      inputFile,
      input,
      handleClickInputFile,
      handleFileChange,
      imageFile,
      resetImage
    }
  }
})
</script>

<style scoped>
.root {
  width: 768px;
}

.title {
  font-size: 36px;
  font-weight: 600;
}

.subtitle {
  font-size: 24px;
  font-weight: 600;
}

.round-wrapper {
  height: 160px;
  width: 160px;
  border: 1px solid #8066b5;
  background-color: #3c3054;
  border-radius: 50%;
  display: inline-block;
  overflow: hidden;
}

::v-deep .ant-tabs-tab {
  color: white;
}

::v-deep .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
  color: #8066b5;
  font-weight: 600;
}

::v-deep .ant-tabs-ink-bar {
  position: absolute;
  background: #8066b5;
  pointer-events: none;
}

.ant-btn {
  border-color: #8066b5 !important;
  background-color: #3c3054 !important;
  color: #a185da;
}
.ant-btn:hover {
  background-color: #2a213c !important;
}

.image-preview {
  object-fit: cover;
  height: 100%;
  width: 100%;
  object-position: center;
}
</style>
